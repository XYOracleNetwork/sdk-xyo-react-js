import { NodeInstance } from '@xyo-network/node-model'
import { Payload } from '@xyo-network/payload-model'

import { IndexedResultsConfig, PollingConfig } from '../../interfaces'
import { createPollingFunction, DEFAULT_POLLING_CONFIG } from './createPollingFunction'
import { divineIndexedResults } from './divineIndexedResults'

/** Poll a set of diviners with various polling strategies  */
export const createDivineIndexedResultsPollingFunction = <T extends Payload = Payload>(
  node?: NodeInstance | null,
  config?: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  onResult?: (result: T[] | null) => void,
) => {
  return createPollingFunction(config, pollDivinerConfig, () => divineIndexedResults(node, config), onResult)
}
