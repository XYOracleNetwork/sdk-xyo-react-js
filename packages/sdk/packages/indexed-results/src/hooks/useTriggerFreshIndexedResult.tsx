import { useCallback } from 'react'

import { UseIndexedResultsConfig } from './lib'

export const useTriggerFreshIndexedResult = ({ indexedResultsConfig: config, trigger }: UseIndexedResultsConfig) => {
  const { freshIndexedResultConfig, processIndexedResults } = config

  const freshResult = useCallback(async () => {
    const { refresh } = freshIndexedResultConfig
    const { parseIndexedResults } = processIndexedResults
    return trigger ? await refresh?.({ parseIndexedResults }) : undefined
  }, [freshIndexedResultConfig, processIndexedResults, trigger])

  return freshResult
}
