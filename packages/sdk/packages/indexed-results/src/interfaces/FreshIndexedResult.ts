import { Payload } from '@xyo-network/payload-model'

import { ProcessIndexedResults } from './ProcessIndexedResults'

export interface FreshIndexedResult<TPayload extends Payload = Payload> {
  refresh?: (params: ProcessIndexedResults) => Promise<TPayload>
}
