import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { usePollDiviners } from './support/index.ts'
import { UseIndexedResultsConfig } from './types/index.ts'
import { useTriggerFreshIndexedResult } from './useTriggerFreshIndexedResult.tsx'

export const useFreshIndexedResult = <TResult extends Payload = Payload>(config?: UseIndexedResultsConfig) => {
  const { indexedResultsConfig, pollingConfig, queueConfig, trigger } = config ?? {}
  const { queue, taskId } = queueConfig ?? {}

  const freshResult = useTriggerFreshIndexedResult(indexedResultsConfig, trigger)

  const { pollDiviners, pollResults } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

  // Start the polling and wait for the results elsewhere
  const [, error, state] = usePromise(async () => {
    if (trigger) {
      if (queue) {
        const task = async () => {
          await freshResult()
          await pollDiviners()
        }
        return await queue.addRequest<ReturnType<typeof task>>(task, taskId ?? Date.now().toString())
      } else {
        await freshResult()
        await pollDiviners()
      }
    }
  }, [pollDiviners, freshResult, trigger, queue, taskId])

  return [pollResults, error, state === 'pending' ? 'polling' : state]
}
