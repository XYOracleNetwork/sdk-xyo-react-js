import { delay } from '@xylabs/delay'
import { DivinerInstance } from '@xyo-network/diviner-model'
import { Payload } from '@xyo-network/payload-model'

import { ParseIndexedResults } from '../../interfaces'

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
): Promise<TPayload[] | null> => {
  const results = await divineSingleIndexedResultsInner(diviner, indexedQueries, parseIndexedResults)
  if (results) {
    return results
  }
  if (retries <= 0) {
    return null
  }
  await delay(interval)
  return divineSingleIndexedResults(diviner, indexedQueries, parseIndexedResults, retries - 1, interval * backoff, backoff)
}
