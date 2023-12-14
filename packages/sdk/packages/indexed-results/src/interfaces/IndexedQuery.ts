import { Payload } from '@xyo-network/payload-model'

export interface IndexedQuery {
  /** query to search for indexed results */
  indexedQuery: Payload
  /** Budget */
  queryBudget?: Payload
}
