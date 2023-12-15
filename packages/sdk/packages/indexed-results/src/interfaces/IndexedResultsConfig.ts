import { Payload } from '@xyo-network/payload-model'

export interface ProcessIndexedResults {
  /** function to ensure the results meets a required level of freshness */
  isFresh?: (payloads?: Payload[] | null) => boolean
  /** Validate and parse results from the diviner(s) (i.e. validate and resolve the hashes that are in the query result) */
  parseIndexedResults: (payloads: Payload[]) => Promise<Payload[] | undefined>
}

export interface IndexedResultsConfig<TPayload extends Payload = Payload> {
  /** diviner that can check the the archivist for the latest results */
  diviners: string[]
  /** query to search for indexed results */
  indexedQuery: Payload
  /** Functions to process indexedResults */
  processIndexedResults: ProcessIndexedResults
  /** Budget */
  queryBudget?: Payload
  /** Function to get a fresh result (i.e. sentinel report or witness observation) */
  refresh?: (params: ProcessIndexedResults) => Promise<TPayload>
}
