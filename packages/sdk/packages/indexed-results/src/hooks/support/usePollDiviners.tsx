import { Payload } from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

import { IndexedResultsConfig, PollingConfig } from '../../interfaces'
import { useTryDiviners } from './useTryDiviners'

export type FunctionToPoll = () => Promise<Payload[] | null | undefined>

const DEFAULT_POLLING_CONFIG: PollingConfig = {
  initialDelay: 100,
  maxDelay: 10000,
  maxRetries: 8,
}

export const usePollingFunction = <T extends Payload = Payload>(
  config: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  functionToPoll: FunctionToPoll,
  onResult?: (result: T[]) => void,
) => {
  const { indexedQuery } = config
  const { isFresh } = config.processIndexedResults
  const { maxDelay = 10000, maxRetries, initialDelay = 100 } = pollDivinerConfig

  const [activePolling, setActivePolling] = useState(true)

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

  /** A polling function that runs on an increasing delay for a fixed number of times */
  const pollDivinersWithDelay = useCallback(
    async (newDelay: number, functionToPoll: FunctionToPoll) => {
      if (activePolling && maxRetries !== null) {
        let retries = 0
        let result: Payload[] | undefined | null

        await new Promise((resolve) => setTimeout(() => resolve(true), newDelay))
        try {
          // Try for a fixed number of times
          if (retries < maxRetries) {
            // logarithmic backoff till we hit the max, then we continue that delay for remaining tries
            const updatedDelay = newDelay >= maxDelay ? newDelay : newDelay * 3
            result = await functionToPoll()

            const fresh = freshTest(result)
            if (!result || !fresh) {
              console.log(`Completed Retry ${retries} - Retrying in ${updatedDelay} milliseconds...`)
              retries++
              await pollDivinersWithDelay(updatedDelay, functionToPoll)
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
    [activePolling, maxRetries, freshTest, maxDelay, indexedQuery],
  )

  /** A polling function that runs indefinitely on a set interval */
  const pollDivinersIndefinitely = useCallback(
    async (newDelay: number, functionToPoll: FunctionToPoll) => {
      if (activePolling) {
        let result: Payload[] | undefined | null

        await new Promise((resolve) => setTimeout(() => resolve(true), newDelay))
        try {
          result = await functionToPoll()

          const fresh = freshTest(result)
          if (result || fresh) {
            onResult?.(result as T[])
          }
          await pollDivinersIndefinitely(initialDelay, functionToPoll)
        } catch (e) {
          console.error('error retrying diviner', e)
          throw e
        }
      }
    },
    [activePolling, freshTest, initialDelay, onResult],
  )

  /** Function to invoke polling by determining a polling strategy */
  const poll = useCallback(async () => {
    if (maxRetries === null) {
      return await pollDivinersIndefinitely(initialDelay, functionToPoll)
    } else {
      return await pollDivinersWithDelay(initialDelay, functionToPoll)
    }
  }, [functionToPoll, initialDelay, maxRetries, pollDivinersIndefinitely, pollDivinersWithDelay])

  return { cancelPolling, poll }
}

/** Poll a set of diviners with various polling strategies  */
export const usePollDiviners = <T extends Payload = Payload>(
  config: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  onResult?: (result: T[]) => void,
) => {
  const tryDiviners = useTryDiviners(config)
  const [results, setResults] = useState<T[]>()
  const onResultLocal = useCallback((results: T[]) => (onResult ? onResult(results) : setResults(results)), [onResult])

  const { cancelPolling, poll } = usePollingFunction(config, pollDivinerConfig, tryDiviners, onResultLocal)
  return { cancelPolling, pollDiviners: poll, results }
}
