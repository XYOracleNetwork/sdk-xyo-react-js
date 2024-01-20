import { DivinerInstance } from '@xyo-network/diviner-model'
import { Payload } from '@xyo-network/payload-model'

import { ParseIndexedResults } from '../../interfaces'

export const divineSingleIndexedResults = async (diviner: DivinerInstance, indexedQueries: Payload[], parseIndexedResults?: ParseIndexedResults) => {
  const divinedResult = await diviner.divine(indexedQueries)
  let results: Payload[] | undefined
  if (divinedResult?.length > 0) {
    results = parseIndexedResults ? await parseIndexedResults(divinedResult) : divinedResult
  }
  return results && results.length > 0 ? results : null
}
