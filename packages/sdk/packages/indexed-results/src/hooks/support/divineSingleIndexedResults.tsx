import { retry } from '@xylabs/retry'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import type { Payload } from '@xyo-network/payload-model'

import type { ParseIndexedResults } from '../../interfaces/index.ts'

const divineSingleIndexedResultsInner = async <TPayload extends Payload = Payload>(
  diviner: DivinerInstance,
  indexedQueries: Payload[],
  parseIndexedResults?: ParseIndexedResults<TPayload>,
) => {
  const divinedResult = await diviner.divine(indexedQueries)
  let results: TPayload[] | undefined
  if (divinedResult?.length > 0) {
    results = parseIndexedResults ? await parseIndexedResults(divinedResult) : (divinedResult as TPayload[])
  }
  return results && results.length > 0 ? results : null
}

export const divineSingleIndexedResults = async <TPayload extends Payload = Payload>(
  diviner: DivinerInstance,
  indexedQueries: Payload[],
  parseIndexedResults?: ParseIndexedResults<TPayload>,
  retries = 0,
  interval = 100,
  backoff = 2,
): Promise<TPayload[] | null | undefined> => {
  return await retry(() => divineSingleIndexedResultsInner(diviner, indexedQueries, parseIndexedResults), {
    backoff, interval, retries,
  })
}
