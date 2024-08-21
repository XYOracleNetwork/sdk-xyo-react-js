import { usePromise } from '@xylabs/react-promise'
import type { Payload } from '@xyo-network/payload-model'
import { Semaphore } from 'async-mutex'

import { usePollDiviners } from './support/index.ts'
import type { UseIndexedResultsConfig } from './types/index.ts'

let semaphoreLimit = 100
const semaphore = new Semaphore(semaphoreLimit)

export const setIndexedResultsLimit = (limit: number) => {
  semaphore.setValue(limit - (semaphoreLimit - semaphore.getValue()))
  semaphoreLimit = limit
}

export const useIndexedResults = <TResult extends Payload = Payload>(config?: UseIndexedResultsConfig) => {
  const {
    indexedResultsConfig, pollingConfig, queueConfig, trigger,
  } = config ?? {}
  const {
    queue, taskId,
  } = queueConfig ?? {}

  const {
    pollDiviners, pollResults,
  } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

  // Start the polling and wait for the results elsewhere
  const [, error, state] = usePromise(async () => {
    if (trigger) {
      await semaphore.acquire()
      try {
        if (queue) {
          const task = async () => {
            await pollDiviners()
          }
          return await queue.addRequest<ReturnType<typeof task>>(task, taskId ?? Date.now().toString())
        } else {
          await pollDiviners()
        }
      } finally {
        semaphore.release()
      }
    }
  }, [pollDiviners, queue, taskId, trigger])

  return [pollResults, error, state === 'pending' ? 'polling' : state]
}
