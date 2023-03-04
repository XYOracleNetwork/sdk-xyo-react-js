import { NodeModule } from '@xyo-network/node'

import { useModule } from './useModule'
import { useProvidedNode } from './useProvidedNode'

export const useNode = (nameOrAddress?: string): [NodeModule | undefined, Error | undefined] => {
  const providedNode = useProvidedNode()
  const node = useModule<NodeModule>(nameOrAddress)

  if (nameOrAddress) {
    if (providedNode && node) {
      return node
    }
  } else {
    return providedNode
  }
  return [undefined, undefined]
}
