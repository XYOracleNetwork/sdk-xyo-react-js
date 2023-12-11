import { usePromise } from "@xylabs/react-promise";
import { IndexedResultsConfig } from "../interfaces";

export const useTriggerFreshIndexedResult = (config: IndexedResultsConfig, trigger = false) => {
  const { freshIndexedResultConfig, processIndexedResults } = config

  const [triggerResult] = usePromise(async () => {
    const { refresh } = freshIndexedResultConfig
    const { parseResults, validateDivinerResults } = processIndexedResults
    return trigger ? await refresh?.({ parseResults, validateDivinerResults }) : undefined
  }, [freshIndexedResultConfig, trigger])

  return triggerResult
}

// TODO - make hook that combines the useTriggerFreshIndexedResult && usePollDiviners to get a single result