import { asDivinerInstance } from '@xyo-network/diviner-model'
import { NodeInstance } from '@xyo-network/node-model'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig } from '../../interfaces/index.ts'
import { divineSingleIndexedResults } from './divineSingleIndexedResults.tsx'

export const divineIndexedResults = async <T extends Payload = Payload>(node?: NodeInstance | null, config?: IndexedResultsConfig) => {
  let index = 0

  const { diviners } = config ?? {}

  const { indexedQueries, processIndexedResults } = config ?? {}
  const parseIndexedResults = processIndexedResults?.parseIndexedResults

  if (diviners && node && indexedQueries) {
    while (index < diviners?.length) {
      const nameOrAddress = diviners[index]
      const diviner = asDivinerInstance(await node.resolve(diviners[index]))
      if (diviner) {
        const divinerResult = await divineSingleIndexedResults(diviner, indexedQueries, parseIndexedResults)
        if (divinerResult?.length) {
          return divinerResult as T[]
        }
      } else {
        console.warn(`Unable to resolve or resolved non-diviner [${nameOrAddress}]`)
      }
      index++
    }
    return null
  }
}
