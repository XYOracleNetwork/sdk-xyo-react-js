import { Payload } from '@xyo-network/payload-model'

export interface ProcessIndexedResults {
    /** decompose the query result (i.e. resolve the hashes that are in the query result) */
    parseResults?: (results: Payload[]) => Promise<Payload[]>
    /** Validates results from the diviner(s) to ensure they are of the expected type */
    validateDivinerResults: (payloads: Payload[]) => Promise<Payload[] | undefined>
}

export interface IndexedSources extends ProcessIndexedResults {
  /** the source of the indexed query payloads */
  archivist: string
  /** diviner that can check the the archivist for the latest results */
  diviners: string[]
}
