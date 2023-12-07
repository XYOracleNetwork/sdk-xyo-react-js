import { Payload } from '@xyo-network/payload-model'

export interface IndexedSourceConfig {
  /** the source of the indexed query payloads */
  archivist: string
  // TODO - make an array
  /** diviner that can check the the archivist for the latest results */
  diviner: string
  /** an optional fallback diviner to check for additional results */
  fallbackDiviner?: string
  /** decompose the query result (i.e. resolve the hashes that are in the query result) */
  parseResults?: (results: Payload) => Promise<Payload[]>
  /** A module that can be called to get a fresh result on demand (i.e. re-witness) */
  refreshModule?: string
  /** likely an identity function to prove the payload type */
  validateQueryResult: (payload: Payload) => boolean
}
