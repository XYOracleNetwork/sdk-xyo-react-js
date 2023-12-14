import { Payload } from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

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
  const [activePolling, setActivePolling] = useState(true)
  const tryDiviners = useTryDiviners<T>(config)
  const { indexedQuery } = config
  const { isFresh } = config.processIndexedResults
  const { maxDelay, maxRetries, initialDelay } = pollDivinerConfig

  const cancelPolling = useCallback(() => {
    setActivePolling(false)
  }, [])

  const freshTest = useCallback(
    (result?: Payload[] | null) => {
      if (isFresh) {
        return isFresh(result)
      }
      return true
    },
    [isFresh],
  )

  const pollDivinersWithDelay = useCallback(
    async (newDelay: number) => {
      if (activePolling) {
        let retries = 0
        let result: Payload[] | undefined | null

        await new Promise((resolve) => setTimeout(() => resolve(true), newDelay))
        try {
          // try indefinitely
          if (maxRetries === null) {
            result = await tryDiviners()

            const fresh = freshTest(result)
            if (!result || !fresh) {
              await pollDivinersWithDelay(initialDelay)
            }
            return result as T[]
          }

          // Try for a fixed number of times
          if (retries < maxRetries) {
            // logarithmic backoff till we hit the max, then we continue that delay for remaining tries
            const updatedDelay = newDelay >= maxDelay ? newDelay : newDelay * 3
            result = await tryDiviners()

            const fresh = freshTest(result)
            if (!result || !fresh) {
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
      }
    },
    [activePolling, maxRetries, tryDiviners, freshTest, initialDelay, maxDelay, indexedQuery],
  )

  const pollDiviners = useCallback(async () => {
    return await pollDivinersWithDelay(initialDelay)
  }, [initialDelay, pollDivinersWithDelay])

  return { cancelPolling, pollDiviners }
}
