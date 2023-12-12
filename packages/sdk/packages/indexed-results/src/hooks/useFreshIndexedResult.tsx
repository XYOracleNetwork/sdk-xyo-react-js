import { usePromise } from "@xylabs/react-promise";
import { IndexedResultsConfig } from "../interfaces";
import { usePollDiviners } from "./support";
import { useTriggerFreshIndexedResult } from "./useTriggerFreshIndexedResult";

export const useFreshIndexedResult = (config: IndexedResultsConfig) => {
  const triggerResult = useTriggerFreshIndexedResult(config)

  const pollDiviners = usePollDiviners(config)

  const [result, error, state] = usePromise(async () => {
    if (triggerResult) {
      return await pollDiviners()
    }
  }, [pollDiviners, triggerResult])

  return [result, error, state]
}