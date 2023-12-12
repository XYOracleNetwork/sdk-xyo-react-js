import { useCallback } from "react";
import { IndexedResultsConfig } from "../interfaces";

export const useTriggerFreshIndexedResult = (config: IndexedResultsConfig, trigger = false) => {
  const { freshIndexedResultConfig, processIndexedResults } = config

  const freshResult = useCallback(async () => {
    const { refresh } = freshIndexedResultConfig
    const { parseResults, validateDivinerResults } = processIndexedResults
    return trigger ? await refresh?.({ parseResults, validateDivinerResults }) : undefined
  }, [freshIndexedResultConfig, processIndexedResults, trigger,])

  return freshResult
}
