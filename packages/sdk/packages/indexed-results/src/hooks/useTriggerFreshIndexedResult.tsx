import { useCallback } from "react";
import { IndexedResultsConfig } from "../interfaces";

export const useTriggerFreshIndexedResult = (config: IndexedResultsConfig, trigger = false) => {
  const { freshIndexedResultConfig, processIndexedResults } = config

  const freshResult = useCallback(async () => {
    const { refresh } = freshIndexedResultConfig
    const { parseIndexedResults } = processIndexedResults
    return trigger ? await refresh?.({ parseIndexedResults }) : undefined
  }, [freshIndexedResultConfig, processIndexedResults, trigger,])

  return freshResult
}
