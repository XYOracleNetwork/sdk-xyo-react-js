import { Payload } from '@xyo-network/payload-model'
import { useCallback } from 'react'

import { IndexedResultsConfig, PollingConfig } from '../../interfaces'
import { useTryDiviners } from './useTryDiviners'

const DEFAULT_POLLING_CONFIG: PollingConfig = {
  initialDelay: 100,
  maxDelay: 10000,
  maxRetries: 8,
}

export const usePollDiviners = <T extends Payload = Payload>(
  config: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
) => {
  const tryDiviners = useTryDiviners<T>(config)
  const { indexedQuery } = config.indexedQueryConfig
  const { isFresh } = config.processIndexedResults
  const { maxDelay, maxRetries, initialDelay } = pollDivinerConfig

  const pollDivinersWithDelay = useCallback(
    async (newDelay: number) => {
      let retries = 0
      let result: Payload[] | undefined | null

      await new Promise((resolve) => setTimeout(() => resolve(true), newDelay))
      try {
        if (retries < maxRetries) {
          // logarithmic backoff till we hit the max, then we continue that delay for remaining tries
          const updatedDelay = newDelay >= maxDelay ? newDelay : newDelay * 3
          result = await tryDiviners()

          const stale = isFresh && result && result.length > 0 ? isFresh(result) : true
          if (!result || stale) {
            console.log(`Completed Retry ${retries} - Retrying in ${updatedDelay} milliseconds...`)
            retries++
            await pollDivinersWithDelay(updatedDelay)
          }
          return result as T[]
        } else {
          console.warn('Exceeded maximum retries.', JSON.stringify(indexedQuery))
          return
        }
      } catch (e) {
        console.error('error retrying diviner', e)
        throw e
      }
    },
    [maxDelay, maxRetries, indexedQuery, isFresh],
  )

  const pollDiviners = useCallback(async () => {
    return await pollDivinersWithDelay(initialDelay)
  }, [initialDelay, pollDivinersWithDelay])

  return pollDiviners
}
