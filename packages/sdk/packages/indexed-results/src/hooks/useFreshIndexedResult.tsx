import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'
import { useMemo } from 'react'

import { usePollDiviners } from './support'
import { UseIndexedResultsConfig } from './types'
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