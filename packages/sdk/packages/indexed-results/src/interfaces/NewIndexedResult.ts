import { Payload } from "@xyo-network/payload-model";
import { ProcessIndexedResults } from "./IndexedSources";

export interface NewIndexedResult<TPayload extends Payload = Payload> {
  refresh?: (params: ProcessIndexedResults) => Promise<TPayload>
}