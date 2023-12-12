import { usePromise } from "@xylabs/react-promise";
import { Payload } from "@xyo-network/payload-model";
import { PromiseQueue } from "../classes";
import { IndexedResultsConfig } from "../interfaces";
import { PollDivinerConfig, usePollDiviners } from "./support";
import { useTriggerFreshIndexedResult } from "./useTriggerFreshIndexedResult";

export interface FreshIndexedResultConfig {
  /** Indexed Results Configuration */
  config: IndexedResultsConfig
  /** Configuration for polling diviners */
  pollingConfig?: PollDivinerConfig
  /** Optional queue to manage polling requests */
  queue?: PromiseQueue
  /** Optional identifier for tasks in the queue */
  taskId?: string
  /** External trigger to start the hook logic */
  trigger?: boolean
}

export const useFreshIndexedResult = <TResult extends Payload = Payload>({ config, pollingConfig, queue, taskId, trigger}: FreshIndexedResultConfig) => {
  const freshResult = useTriggerFreshIndexedResult(config, trigger)

  const pollDiviners = usePollDiviners<TResult>(config, pollingConfig)

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
