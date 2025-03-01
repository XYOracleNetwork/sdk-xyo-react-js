import { exists } from '@xylabs/exists'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import type { Payload } from '@xyo-network/payload-model'
import { useProvidedNode } from '@xyo-network/react-node'
import { useCallback } from 'react'

import type { IndexedResultsConfig, ProcessIndexedResults } from '../../interfaces/index.ts'

export const useTryDiviners = <T extends Payload = Payload>(config?: IndexedResultsConfig): (() => Promise<Payload[] | undefined | null>) => {
  const [node] = useProvidedNode()
  const { indexedQueries, processIndexedResults } = config ?? {}
  const parseIndexedResults = processIndexedResults?.parseIndexedResults

  const tryDiviner = useCallback(
    async (diviner: DivinerInstance, indexedQueries: Payload[], parseIndexedResults?: ProcessIndexedResults['parseIndexedResults']) => {
      const divinedResult = await diviner.divine(indexedQueries)
      let results: Payload[] | undefined
      if (divinedResult?.length > 0) {
        results = parseIndexedResults ? await parseIndexedResults(divinedResult) : divinedResult
      }
      return results && results.length > 0 ? results : null
    },
    [],
  )

  const tryDiviners = useCallback(async () => {
    let result: T[] | undefined | null
    let divinerCount = 0

    if (config?.diviners && node) {
      const resolvedDiviners = (await Promise.all(config.diviners.map(id => node.resolve(id)))).filter(exists)
      const diviners = resolvedDiviners.filter(mod => isDivinerInstance(mod)) as DivinerInstance[]

      if (diviners && diviners?.length > 0) {
        while (divinerCount < diviners?.length && indexedQueries) {
          const divinerResult = await tryDiviner(diviners[divinerCount], indexedQueries, parseIndexedResults)
          if (divinerResult && divinerResult?.length) {
            result = divinerResult as T[]
            break
          }
          divinerCount++
        }
        return result ?? null
      }
    }
  }, [config?.diviners, indexedQueries, node, parseIndexedResults, tryDiviner])

  return tryDiviners
}
