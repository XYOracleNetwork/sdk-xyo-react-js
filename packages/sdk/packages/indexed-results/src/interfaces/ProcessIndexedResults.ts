import { Payload } from "@xyo-network/payload-model"

export interface ProcessIndexedResults {
  /** decompose the query result (i.e. resolve the hashes that are in the query result) */
  parseResults?: (results: Payload[]) => Promise<Payload[]>
  /** Validates results from the diviner(s) to ensure they are of the expected type */
  validateDivinerResults: <T extends Payload = Payload>(payloads: Payload[]) => Promise<T[] | undefined>
  /** function to ensure the results meets a required level of freshness */
  isFresh?: (payloads: Payload[]) => boolean
}
