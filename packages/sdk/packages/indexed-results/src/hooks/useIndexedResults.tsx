import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance, ArchivistModuleEventData } from '@xyo-network/archivist-model'
import { EventListener } from '@xyo-network/module-events'
import { Payload } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useDivinerFromNode } from '@xyo-network/react-diviner'
import { useCallback, useEffect, useState } from 'react'

import { IndexedResultsConfig, IndexedSourceConfig } from '../interfaces'

const useFetchModules = (config: IndexedSourceConfig) => {
  const { archivist: archivistName, diviner: divinerName, remoteDiviner: remoteDivinerName } = config

  const [archivist] = useArchivistFromNode(archivistName)
  const [diviner] = useDivinerFromNode(divinerName)
  const [remoteDiviner] = useDivinerFromNode(remoteDivinerName)

  return {
    archivist,
    diviner,
    remoteDiviner,
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
  const { archivist, diviner, remoteDiviner } = useFetchModules(config.indexedSourceConfig)
  const { parseResults, validateQueryResult } = config.indexedSourceConfig
  const { generateWhenNotFound, listenForNewResults, query, skipCache } = config.indexedQueryConfig

  const newResultRaw = useListenForNewResults(archivist, listenForNewResults)

  const testResults = useCallback(
    async (divinedResult?: Payload[]) => {
      const validatedDivinedResult = divinedResult?.find(validateQueryResult)
      if (validatedDivinedResult) {
        const localResult = parseResults ? await parseResults?.(validatedDivinedResult) : validatedDivinedResult
        if (localResult) return localResult
      }
    },
    [parseResults, validateQueryResult],
  )

  const [newResult] = usePromise(async () => {
    if (newResultRaw?.length) {
      return await testResults(newResultRaw)
    }
  }, [newResultRaw, testResults])

  const [localResult] = usePromise(async () => {
    if (!skipCache) {
      // Check locally
      const divinedResult = await diviner?.divine([query])
      const result = await testResults(divinedResult)
      return result ?? null
    }

    if (generateWhenNotFound && !remoteDiviner) {
      // TODO = handle re-witnessing
      // return await reWitness(urlPayload, refreshModule, queryPayload, remoteDiviner, sourceArchivist, currentTimeStamp?.timestamp, queue)
    }
  }, [diviner, generateWhenNotFound, query, remoteDiviner, skipCache, testResults])

  const [remoteResult] = usePromise(async () => {
    if (!skipCache && localResult === null) {
      // Check remotely
      const divinedResult = await remoteDiviner?.divine([query])
      const remoteResult = await testResults(divinedResult)
      if (remoteResult) return remoteResult

      if (generateWhenNotFound) {
        // TODO = handle re-witnessing
        // return await reWitness(urlPayload, refreshModule, queryPayload, remoteDiviner, sourceArchivist, currentTimeStamp?.timestamp, queue)
      }
      return null
    }
  }, [generateWhenNotFound, localResult, query, remoteDiviner, skipCache, testResults])

  return [newResult ?? localResult ?? remoteResult]
}
