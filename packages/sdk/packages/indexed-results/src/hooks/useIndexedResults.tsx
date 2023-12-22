import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { usePollDiviners } from './support'
import { UseIndexedResultsConfig } from './types'

export const useIndexedResults = <TResult extends Payload = Payload>(config?: UseIndexedResultsConfig) => {
  const { indexedResultsConfig, pollingConfig, queueConfig, trigger } = config ?? {}
  const { queue, taskId } = queueConfig ?? {}

  const { pollDiviners, pollResults } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

  // Start the polling and wait for the results elsewhere
  const [, error, state] = usePromise(async () => {
    if (trigger) {
      if (queue) {
        const task = async () => {
          await pollDiviners()
        }
        return await queue.addRequest<ReturnType<typeof task>>(task, taskId ?? Date.now().toString())
      } else {
        await pollDiviners()
      }
    }
  }, [pollDiviners, queue, taskId, trigger])

  return [pollResults, error, state === 'pending' ? 'polling' : state]
}
