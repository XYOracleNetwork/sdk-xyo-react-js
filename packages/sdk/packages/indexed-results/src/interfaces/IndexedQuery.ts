import { Payload } from '@xyo-network/payload-model'

export interface IndexedQuery {
  /** A payload that sets the standard of freshness (i.e. a timestamp payload) */
  freshnessThreshold?: Payload
  /** query to search for indexed results */
  indexedQuery: Payload 
  /** setup a listener for new indexed results */
  listenForNewResults?: boolean
  /** Budget */
  queryBudget?: Payload
}
