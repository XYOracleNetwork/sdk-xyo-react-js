import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'
import { useMemo } from 'react'

import { UseIndexedResultsConfig } from './lib'
import { usePollDiviners } from './support'
import { useTriggerFreshIndexedResult } from './useTriggerFreshIndexedResult'

export const useFreshIndexedResult = <TResult extends Payload = Payload>({
  indexedResultsConfig,
  pollingConfig,
  queueConfig,
  trigger,
}: UseIndexedResultsConfig) => {
  const { queue, taskId } = queueConfig ?? {}

  const triggerFreshResultsConfig = useMemo(() => ({ indexedResultsConfig, trigger }), [indexedResultsConfig, trigger])
  const freshResult = useTriggerFreshIndexedResult(triggerFreshResultsConfig)

  const { pollDiviners } = usePollDiviners<TResult>(indexedResultsConfig, pollingConfig)

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
