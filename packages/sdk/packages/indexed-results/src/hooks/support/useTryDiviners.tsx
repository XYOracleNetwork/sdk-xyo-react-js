import { DivinerInstance } from '@xyo-network/diviner-model'
import { Payload } from '@xyo-network/payload-model'
import { useCallback } from 'react'

import { IndexedResultsConfig } from '../../interfaces'
import { useFetchModules } from './useFetchModules'

export const useTryDiviners = <T extends Payload = Payload>(config: IndexedResultsConfig): (() => Promise<Payload[] | undefined | null>) => {
  const { diviners } = useFetchModules(config)
  const { indexedQuery } = config
  const { parseIndexedResults } = config.processIndexedResults

  const tryDiviner = useCallback(
    async (diviner?: DivinerInstance) => {
      const divinedResult = await diviner?.divine([indexedQuery])
      const results = divinedResult ? await parseIndexedResults(divinedResult) : []
      return results && results.length ? results : null
    },
    [indexedQuery, parseIndexedResults],
  )

  const tryDiviners = useCallback(async () => {
    let result: T[] | undefined | null
    let divinerCount = 0

    if (diviners && diviners?.length > 0) {
      while (divinerCount <= diviners?.length) {
        const divinerResult = await tryDiviner(diviners[divinerCount])
        if (divinerResult && divinerResult?.length) {
          result = divinerResult as T[]
        }
        divinerCount++
      }
      return result ?? null
    }
  }, [diviners, tryDiviner])

  return tryDiviners
}
