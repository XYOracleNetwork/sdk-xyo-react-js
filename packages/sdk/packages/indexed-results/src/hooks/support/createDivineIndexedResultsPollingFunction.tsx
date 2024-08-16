import type { NodeInstance } from '@xyo-network/node-model'
import type { Payload } from '@xyo-network/payload-model'

import type { IndexedResultsConfig, PollingConfig } from '../../interfaces/index.ts'
import { createPollingFunction, DEFAULT_POLLING_CONFIG } from './createPollingFunction.tsx'
import { divineIndexedResults } from './divineIndexedResults.tsx'

/** Poll a set of diviners with various polling strategies  */
export const createDivineIndexedResultsPollingFunction = <T extends Payload = Payload>(
  node?: NodeInstance | null,
  config?: IndexedResultsConfig,
  pollDivinerConfig: PollingConfig = DEFAULT_POLLING_CONFIG,
  onResult?: (result: T[] | null) => void,
) => {
  return createPollingFunction(config, pollDivinerConfig, () => divineIndexedResults(node, config), onResult)
}
