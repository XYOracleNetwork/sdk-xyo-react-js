import { setTimeoutEx } from '@xylabs/timer'
import { Payload } from '@xyo-network/payload-model'
import { useCallback, useEffect, useRef, useState } from 'react'

import { IndexedResultsConfig, PollingConfig } from '../../interfaces'
import { useTryDiviners } from './useTryDiviners'

export type FunctionToPoll = () => Promise<Payload[] | null | undefined>

const DEFAULT_POLLING_CONFIG: PollingConfig = {
  initialDelay: 100 / 3, //First time will be zero, second time will be 100
  maxDelay: 10_000,
  maxRetries: 8,
}

export const usePollingFunction = <T extends Payload = Payload>(
  config?: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  functionToPoll?: FunctionToPoll,
  onResult?: (result: T[] | null) => void,
) => {
  const { indexedQueries, processIndexedResults } = config ?? {}
  const { isFresh } = processIndexedResults ?? {}
  const { maxDelay = 10_000, maxRetries, initialDelay = 100, onFoundResult } = pollDivinerConfig

  // internal ref for managing a consistent active polling value across rerenders
  const activePollingRef = useRef(false)

  useEffect(() => {
    // activate polling on initial load
    activePollingRef.current = true
    return () => {
      // cancel all polling on component unmount
      activePollingRef.current = false
    }
  }, [])

  const freshTest = useCallback((result?: Payload[] | null) => (isFresh ? isFresh(result) : true), [isFresh])

  const pollCompleteTest = useCallback((result?: Payload[] | null) => (onFoundResult ? onFoundResult(result) : false), [onFoundResult])

  /** A polling function that runs on an increasing delay for a fixed number of times */
  const pollDivinersWithDelay = useCallback(
    async (newDelay: number, functionToPoll?: FunctionToPoll) => {
      if (activePollingRef.current && maxRetries !== null && functionToPoll) {
        let retries = 0
        let result: Payload[] | undefined | null

        const pollDivinersWithDelayInner = async (newDelay: number) => {
          await new Promise((resolve) => setTimeoutEx(() => resolve(true), retries === 0 ? 0 : newDelay))
          try {
            // Try for a fixed number of times
            if (retries < maxRetries) {
              // logarithmic backoff till we hit the max, then we continue that delay for remaining tries
              const updatedDelay = newDelay >= maxDelay ? newDelay : newDelay * 3
              result = await functionToPoll()

              const fresh = freshTest(result)

              // have a result but its not fresh enough
              if (result && !fresh) {
                console.log(`Completed Retry ${retries} - Retrying in ${updatedDelay} milliseconds...`)
                retries++
                await pollDivinersWithDelayInner(updatedDelay)
              }
              onResult?.(result as T[] | null)
            } else {
              console.warn('Exceeded maximum retries.', JSON.stringify(indexedQueries))
              onResult?.(result as T[] | null)
            }
          } catch (e) {
            console.error('error retrying diviner', e)
            throw e
          }
        }

        return await pollDivinersWithDelayInner(newDelay)
      }
    },
    [maxRetries, maxDelay, freshTest, onResult, indexedQueries],
  )

  /** A polling function that runs indefinitely on a set interval */
  const pollDivinersIndefinitely = useCallback(
    async (newDelay: number, functionToPoll?: FunctionToPoll) => {
      // Uncomment to debug
      // console.log('activePollingRef', activePollingRef)
      if (activePollingRef.current && functionToPoll) {
        let result: Payload[] | undefined | null

        await new Promise((resolve) => setTimeoutEx(() => resolve(true), newDelay))
        try {
          result = await functionToPoll()

          const fresh = freshTest(result)
          const pollComplete = pollCompleteTest(result)

          if ((result && fresh) || result === null) {
            onResult?.(result as T[] | null)
          }
          pollComplete ? (activePollingRef.current = false) : await pollDivinersIndefinitely(initialDelay, functionToPoll)
        } catch (e) {
          console.error('error retrying diviner', e)
          throw e
        }
      }
    },
    [pollCompleteTest, freshTest, initialDelay, onResult],
  )

  /** Function to invoke polling by determining a polling strategy */
  const poll = useCallback(async () => {
    return await (maxRetries === null ? pollDivinersIndefinitely(initialDelay, functionToPoll) : pollDivinersWithDelay(initialDelay, functionToPoll))
  }, [functionToPoll, initialDelay, maxRetries, pollDivinersIndefinitely, pollDivinersWithDelay])

  return { poll }
}

/** Poll a set of diviners with various polling strategies  */
export const usePollDiviners = <T extends Payload = Payload>(
  config?: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  onResult?: (result: T[] | null) => void,
) => {
  const tryDiviners = useTryDiviners(config)
  const [results, setResults] = useState<T[] | null>()
  const onResultLocal = useCallback((results: T[] | null) => (onResult ? onResult(results) : setResults(results)), [onResult])

  const { poll } = usePollingFunction(config, pollDivinerConfig, tryDiviners, onResultLocal)
  return { pollDiviners: poll, pollResults: results }
}
