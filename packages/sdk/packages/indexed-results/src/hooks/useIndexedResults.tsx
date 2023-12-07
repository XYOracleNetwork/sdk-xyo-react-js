import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance, ArchivistModuleEventData } from '@xyo-network/archivist-model'
import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { EventListener } from '@xyo-network/module-events'
import { Payload } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useProvidedNode } from '@xyo-network/react-node'
import { useCallback, useEffect, useState } from 'react'

import { IndexedResultsConfig, IndexedSourceConfig } from '../interfaces'

const useFetchModules = (config: IndexedSourceConfig) => {
  const { archivist: archivistName, diviners: divinerNames } = config
  const [node] = useProvidedNode()

  const [archivist] = useArchivistFromNode(archivistName)
  const [diviners] = usePromise<DivinerInstance[]>(async () => {
    const resolvedDiviners = node ? await node.resolve({ name: divinerNames }) : []
    return resolvedDiviners.filter((module) => isDivinerInstance(module)) as DivinerInstance[]
  }, [divinerNames, node])

  return {
    archivist,
    diviners,
  }
}

const useListenForNewResults = (archivist?: ArchivistInstance, listenForNewResults?: boolean) => {
  const [newResults, setNewResults] = useState<Payload[]>()

  useEffect(() => {
    const listener: EventListener<ArchivistModuleEventData['inserted']> = ({ payloads }) => {
      setNewResults(payloads)
    }
    if (archivist && listenForNewResults) {
      archivist.on('inserted', listener)
    }

    return () => {
      archivist?.off('inserted', listener)
    }
  }, [archivist, listenForNewResults])

  return newResults
}

export const useIndexedResults = (config: IndexedResultsConfig) => {
  const { archivist, diviners } = useFetchModules(config.indexedSourceConfig)
  const { parseResults, validateQueryResult } = config.indexedSourceConfig
  const { listenForNewResults, indexedQuery: query } = config.indexedQueryConfig

  const newResultRaw = useListenForNewResults(archivist, listenForNewResults)

  const validateResults = useCallback(
    async (divinedResult?: Payload[]) => {
      const validatedDivinedResult = divinedResult?.filter(validateQueryResult)
      if (validatedDivinedResult) {
        const localResult = parseResults ? await parseResults?.(validatedDivinedResult) : validatedDivinedResult
        if (localResult) return localResult
      }
    },
    [parseResults, validateQueryResult],
  )

  const tryDiviner = useCallback(
    async (diviner: DivinerInstance) => {
      const divinedResult = await diviner?.divine([query])
      const validatedResult = await validateResults(divinedResult)
      return validatedResult && validatedResult.length ? validatedResult : null
    },
    [query, validateResults],
  )

  const [newResult] = usePromise(async () => {
    if (newResultRaw?.length) {
      return await validateResults(newResultRaw)
    }
  }, [newResultRaw, validateResults])

  const [results] = usePromise(async () => {
    let result: Payload[] | null = null
    let divinerCount = 0

    if (diviners) {
      while (divinerCount <= diviners?.length) {
        const divinerResult = await tryDiviner(diviners[divinerCount])
        if (divinerResult && divinerResult?.length) {
          result = divinerResult
          break
        }
        divinerCount++
      }
      return result
    }
  }, [diviners, tryDiviner])

  return [newResult ?? results]
}
