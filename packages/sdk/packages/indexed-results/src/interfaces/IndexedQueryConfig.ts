import { Payload } from '@xyo-network/payload-model'

export interface IndexedQueryConfig {
  /** A payload that sets the standard of freshness (i.e. a timestamp payload) */
  freshnessThreshold?: Payload
  /** when no results are found, attempt to generate a fresh result */
  generateWhenNotFound?: boolean
  /** query to search for indexed results */
  indexedQuery: Payload
  /** setup a listener for new indexed results */
  listenForNewResults?: boolean
  /** Budget */
  queryBudget?: Payload
  /** skip all currently indexed results and immediately generate a new result */
  skipCache?: boolean
}
