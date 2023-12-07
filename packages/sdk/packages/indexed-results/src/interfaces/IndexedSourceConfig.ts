import { Payload } from '@xyo-network/payload-model'

export interface IndexedSourceConfig {
  /** the source of the indexed query payloads */
  archivist: string
  /** diviner that can check the the archivist for the latest results */
  diviners: string[]
  /** decompose the query result (i.e. resolve the hashes that are in the query result) */
  parseResults?: (results: Payload[]) => Promise<Payload[]>
  /** A module that can be called to get a fresh result on demand (i.e. re-witness) */
  refreshModule?: string
  /** likely an identity function to prove the payload type */
  validateQueryResult: (payload: Payload) => boolean
}
