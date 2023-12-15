import { useCallback } from 'react'

import { UseIndexedResultsConfig } from './types'

export const useTriggerFreshIndexedResult = ({ indexedResultsConfig, trigger }: UseIndexedResultsConfig) => {
  const { refresh, processIndexedResults } = indexedResultsConfig

  const freshResult = useCallback(async () => {
    const { parseIndexedResults } = processIndexedResults
    return trigger ? await refresh?.({ parseIndexedResults }) : undefined
  }, [refresh, processIndexedResults, trigger])

  return freshResult
}
