import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { NodeInstance } from '@xyo-network/node-model'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig } from '../../interfaces'
import { divineSingleIndexedResults } from './divineSingleIndexedResults'

export const divineIndexedResults = async <T extends Payload = Payload>(node?: NodeInstance | null, config?: IndexedResultsConfig) => {
  let result: T[] | undefined | null
  let divinerCount = 0

  const { indexedQueries, processIndexedResults } = config ?? {}
  const parseIndexedResults = processIndexedResults?.parseIndexedResults

  if (config?.diviners && node) {
    const resolvedDiviners = await node.resolve({ name: config.diviners })
    const diviners = resolvedDiviners.filter((module) => isDivinerInstance(module)) as DivinerInstance[]

    if (diviners && diviners?.length > 0) {
      while (divinerCount < diviners?.length && indexedQueries) {
        const divinerResult = await divineSingleIndexedResults(diviners[divinerCount], indexedQueries, parseIndexedResults)
        if (divinerResult && divinerResult?.length) {
          result = divinerResult as T[]
          break
        }
        divinerCount++
      }
      return result ?? null
    }
  }
}
