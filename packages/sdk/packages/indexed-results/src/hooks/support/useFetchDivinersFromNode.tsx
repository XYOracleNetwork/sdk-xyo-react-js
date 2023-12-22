import { usePromise } from '@xylabs/react-promise'
import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { useProvidedNode } from '@xyo-network/react-node'

import { IndexedResultsConfig } from '../../interfaces'

export const useFetchDivinersFromNode = (config?: IndexedResultsConfig) => {
  const { diviners: divinerNames } = config ?? {}
  const [node] = useProvidedNode()

  const [diviners] = usePromise<DivinerInstance[]>(async () => {
    if (divinerNames) {
      const resolvedDiviners = node ? await node.resolve({ name: divinerNames }) : []
      const foundDiviners = resolvedDiviners.filter((module) => isDivinerInstance(module)) as DivinerInstance[]
      return foundDiviners
    }
  }, [divinerNames, node])

  return {
    diviners,
  }
}
