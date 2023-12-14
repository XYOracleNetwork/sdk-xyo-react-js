import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { UseIndexedResultsConfig } from './lib'
import { usePollDiviners } from './support'

export const useIndexedResults = <TResult extends Payload = Payload>({
  indexedResultsConfig,
  pollingConfig,
  queueConfig,
  trigger,
}: UseIndexedResultsConfig) => {
  const { queue, taskId } = queueConfig ?? {}

  const { pollDiviners } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

  const [results] = usePromise(async () => {
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

  return results
}
