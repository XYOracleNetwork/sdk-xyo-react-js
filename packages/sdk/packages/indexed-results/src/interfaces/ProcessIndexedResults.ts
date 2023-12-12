import { Payload } from "@xyo-network/payload-model"

export interface ProcessIndexedResults {
  /** Validate and parse results from the diviner(s) (i.e. validate and resolve the hashes that are in the query result) */
  parseIndexedResults: <T extends Payload = Payload>(payloads: Payload[]) => Promise<T[] | undefined>
  /** function to ensure the results meets a required level of freshness */
  isFresh?: (payloads: Payload[]) => boolean
}
