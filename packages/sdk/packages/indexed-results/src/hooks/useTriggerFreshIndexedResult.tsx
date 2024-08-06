import { useCallback } from 'react'

import { IndexedResultsConfig } from '../interfaces/index.ts'

export const useTriggerFreshIndexedResult = (indexedResultsConfig?: IndexedResultsConfig, trigger?: boolean) => {
  const { processIndexedResults, refresh } = indexedResultsConfig ?? {}

  const freshResult = useCallback(async () => {
    if (refresh && trigger) {
      return refresh ? await refresh?.(processIndexedResults ?? {}) : undefined
    }
  }, [refresh, processIndexedResults, trigger])

  return freshResult
}
