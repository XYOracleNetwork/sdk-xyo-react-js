import { Payload } from "@xyo-network/payload-model";
import { ProcessIndexedResults } from "../interfaces";

export interface NewIndexedResultConfig<TPayload extends Payload = Payload> {
  refresh?: (params: ProcessIndexedResults) => Promise<TPayload>
}