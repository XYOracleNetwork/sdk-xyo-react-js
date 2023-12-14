import { useCallback } from 'react'

import { UseIndexedResultsConfig } from './lib'

export const useTriggerFreshIndexedResult = ({ indexedResultsConfig: config, trigger }: UseIndexedResultsConfig) => {
  const { refresh, processIndexedResults } = config

  const freshResult = useCallback(async () => {
    const { parseIndexedResults } = processIndexedResults
    return trigger ? await refresh?.({ parseIndexedResults }) : undefined
  }, [refresh, processIndexedResults, trigger])

  return freshResult
}
