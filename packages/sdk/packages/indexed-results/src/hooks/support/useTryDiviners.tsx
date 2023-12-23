import { DivinerInstance } from '@xyo-network/diviner-model'
import { Payload } from '@xyo-network/payload-model'
import { useCallback } from 'react'

import { IndexedResultsConfig, ProcessIndexedResults } from '../../interfaces'
import { useFetchDivinersFromNode } from './useFetchDivinersFromNode'

export const useTryDiviners = <T extends Payload = Payload>(config?: IndexedResultsConfig): (() => Promise<Payload[] | undefined | null>) => {
  const { diviners } = useFetchDivinersFromNode(config)
  const { indexedQuery, processIndexedResults } = config ?? {}
  const parseIndexedResults = processIndexedResults?.parseIndexedResults

  const tryDiviner = useCallback(
    async (diviner: DivinerInstance, indexedQuery: Payload, parseIndexedResults?: ProcessIndexedResults['parseIndexedResults']) => {
      const divinedResult = await diviner.divine([indexedQuery])
      let results: Payload[] | undefined
      if (divinedResult) {
        results = parseIndexedResults ? await parseIndexedResults(divinedResult) : divinedResult
      }
      return results && results.length > 0 ? results : null
    },
    [],
  )

  const tryDiviners = useCallback(async () => {
    let result: T[] | undefined | null
    let divinerCount = 0
    if (diviners && diviners?.length > 0) {
      while (divinerCount < diviners?.length && indexedQuery) {
        const divinerResult = await tryDiviner(diviners[divinerCount], indexedQuery, parseIndexedResults)
        if (divinerResult && divinerResult?.length) {
          result = divinerResult as T[]
          break
        }
        divinerCount++
      }
      return result ?? null
    }
  }, [diviners, indexedQuery, parseIndexedResults, tryDiviner])

  return tryDiviners
}
