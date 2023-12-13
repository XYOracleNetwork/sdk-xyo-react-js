/**
 * Strategies to get the latest indexed value of a given entity - More for future use
 */
export const IndexedResultsStrategies = {
  /** Try once to get the latest value */
  GetLatest: 'GET_LATEST',
  /** Try to get the latest and watch for new results */
  GetLatestAndWatch: 'GET_LATEST_AND_WATCH',
  /** Try to get the latest and generate a fresh result if none was found */
  GetLatestWithFreshResult: 'GET_LATEST_WITH_FRESH_RESULT',
  /** Try to get the latest and generate a fresh result if none was found and keep watching for new results */
  GetLatestWithFreshResultAndWatch: 'GET_LATEST_WITH_FRESH_RESULT_AND_WATCH',
} as const
