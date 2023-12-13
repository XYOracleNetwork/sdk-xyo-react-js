import { Payload } from '@xyo-network/payload-model'

export interface IndexedQuery {
  /** query to search for indexed results */
  indexedQuery: Payload
  /** setup a listener for new indexed results */
  listenForNewResults?: boolean
  /** Budget */
  queryBudget?: Payload
}
