import { setTimeoutEx } from '@xylabs/timer'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig, PollingConfig } from '../../interfaces/index.js'

export type PollingFunction = () => Promise<Payload[] | null | undefined>

export const DEFAULT_POLLING_CONFIG: PollingConfig = {
  initialDelay: 100 / 3, // First time will be zero, second time will be 100
  maxDelay: 10_000,
  maxRetries: 8,
}

export const createPollingFunction = <T extends Payload = Payload>(
  config?: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  pollingFunction?: PollingFunction,
  onResult?: (result: T[] | null) => void,
) => {
  const { indexedQueries, processIndexedResults } = config ?? {}
  const { isFresh } = processIndexedResults ?? {}
  const { maxDelay = 10_000, maxRetries, initialDelay = 100, onFoundResult } = pollDivinerConfig

  let activePolling = true

  const freshTest = (result?: Payload[] | null) => (isFresh ? isFresh(result) : true)

  const pollCompleteTest = (result?: Payload[] | null) => (onFoundResult ? onFoundResult(result) : false)

  /** A polling function that runs on an increasing delay for a fixed number of times */
  const pollDivinersWithDelay = async (newDelay: number, pollingFunction?: PollingFunction) => {
    if (activePolling && maxRetries !== null && pollingFunction) {
      let retries = 0
      let result: Payload[] | undefined | null

      const pollDivinersWithDelayInner = async (newDelay: number) => {
        await new Promise(resolve => setTimeoutEx(() => resolve(true), retries === 0 ? 0 : newDelay))
        try {
          // Try for a fixed number of times
          if (retries < maxRetries) {
            // logarithmic backoff till we hit the max, then we continue that delay for remaining tries
            const updatedDelay = newDelay >= maxDelay ? newDelay : newDelay * 3
            result = await pollingFunction()

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
  }

  /** A polling function that runs indefinitely on a set interval */
  const pollDivinersIndefinitely = async (newDelay: number, pollingFunction?: PollingFunction) => {
    // Uncomment to debug
    // console.log('activePollingRef', activePollingRef)
    if (activePolling && pollingFunction) {
      let result: Payload[] | undefined | null

      await new Promise(resolve => setTimeoutEx(() => resolve(true), newDelay))
      try {
        result = await pollingFunction()

        const fresh = freshTest(result)
        const pollComplete = pollCompleteTest(result)

        if ((result && fresh) || result === null) {
          onResult?.(result as T[] | null)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        pollComplete ? (activePolling = false) : await pollDivinersIndefinitely(initialDelay, pollingFunction)
      } catch (e) {
        console.error('error retrying diviner', e)
        throw e
      }
    }
  }

  /** Function to invoke polling by determining a polling strategy */
  const poll = async () => {
    return await (maxRetries === null
      ? pollDivinersIndefinitely(initialDelay, pollingFunction)
      : pollDivinersWithDelay(initialDelay, pollingFunction))
  }

  const setActive = (value: boolean) => {
    activePolling = value
  }

  return { poll, setActive }
}
