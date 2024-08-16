import { usePromise } from '@xylabs/react-promise'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import { useProvidedNode } from '@xyo-network/react-node'

import type { IndexedResultsConfig } from '../../interfaces/index.ts'

/** @deprecated - resolve modules on each polling attempt instead of once up front */
export const useFetchDivinersFromNode = (config?: IndexedResultsConfig) => {
  const { diviners: divinerNames } = config ?? {}
  const [node] = useProvidedNode()

  const [diviners] = usePromise<DivinerInstance[]>(async () => {
    if (divinerNames) {
      const resolvedDiviners = node ? await node.resolve({ name: divinerNames }) : []
      const foundDiviners = resolvedDiviners.filter(mod => isDivinerInstance(mod)) as DivinerInstance[]
      return foundDiviners
    }
  }, [divinerNames, node])

  return {
    diviners,
  }
}
