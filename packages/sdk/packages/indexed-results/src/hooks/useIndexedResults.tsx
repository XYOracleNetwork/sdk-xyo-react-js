import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { usePollDiviners } from './support'
import { UseIndexedResultsConfig } from './types'

export const useIndexedResults = <TResult extends Payload = Payload>({
  indexedResultsConfig,
  pollingConfig,
  queueConfig,
  trigger,
}: UseIndexedResultsConfig) => {
  const { queue, taskId } = queueConfig ?? {}

  const { pollDiviners, results } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

  const [, error, state] = usePromise(async () => {
    if (trigger) {
      if (queue) {
        const task = async () => {
          return await pollDiviners()
        }
        return await queue.addRequest<ReturnType<typeof task>>(task, taskId ?? Date.now().toString())
      } else {
        return await pollDiviners()
      }
    }
  }, [pollDiviners, queue, taskId, trigger])

  return [results, error, state === 'pending' ? 'polling' : state]
}
