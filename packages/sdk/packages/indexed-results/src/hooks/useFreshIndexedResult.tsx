import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig, IndexedResultsQueue, PollingConfig } from '../interfaces'
import { usePollDiviners } from './support'
import { useTriggerFreshIndexedResult } from './useTriggerFreshIndexedResult'

export interface FreshIndexedResultConfig {
  /** Indexed Results Configuration */
  config: IndexedResultsConfig
  /** Configuration for polling diviners */
  pollingConfig?: PollingConfig
  /** Queue for handling Promise Results */
  queueConfig?: IndexedResultsQueue
  /** External trigger to start the hook logic */
  trigger?: boolean
}

export const useFreshIndexedResult = <TResult extends Payload = Payload>({
  config,
  pollingConfig,
  queueConfig,
  trigger,
}: FreshIndexedResultConfig) => {
  const { queue, taskId } = queueConfig ?? {}
  const freshResult = useTriggerFreshIndexedResult(config, trigger)

  const { pollDiviners } = usePollDiviners<TResult>(config, pollingConfig)

  const [result, error, state] = usePromise(async () => {
    if (trigger) {
      if (queue) {
        const task = async () => {
          await freshResult()
          return await pollDiviners()
        }
        return await queue.addRequest<ReturnType<typeof task>>(task, taskId ?? Date.now().toString())
      } else {
        await freshResult()
        return await pollDiviners()
      }
    }
  }, [pollDiviners, freshResult, trigger, queue, taskId])

  return [result, error, state]
}
