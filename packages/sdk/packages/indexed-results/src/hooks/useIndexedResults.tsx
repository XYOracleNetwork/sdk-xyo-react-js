import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig, IndexedResultsQueue, PollingConfig } from '../interfaces'
import { usePollDiviners } from './support'

export const useIndexedResults = <TResult extends Payload = Payload>(
  /** Indexed Results Configuration */
  config: IndexedResultsConfig,
  /** Configuration for polling diviners */
  pollingConfig?: PollingConfig,
  /** Queue for handling Promise Results */
  queueConfig?: IndexedResultsQueue,
  /** External trigger to start the hook logic */
  trigger?: boolean,
) => {
  const { queue, taskId } = queueConfig ?? {}

  const pollDiviners = usePollDiviners<TResult>(config, pollingConfig)

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

  return [results]
}
