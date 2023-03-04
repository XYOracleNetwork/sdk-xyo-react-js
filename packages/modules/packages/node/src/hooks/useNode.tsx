import { NodeModule } from '@xyo-network/node'

import { useModule } from './useModule'
import { useProvidedWrappedNode } from './useProvidedNode'

export const useNode = (nameOrAddress?: string): [NodeModule | undefined, Error | undefined] => {
  const [providedNode, providedNodeError] = useProvidedWrappedNode()
  const [node, nodeError] = useModule<NodeModule>(nameOrAddress)

  if (nameOrAddress) {
    if (providedNode) {
      return [node, nodeError]
    } else {
      return [providedNode, providedNodeError]
    }
  } else {
    return [providedNode, providedNodeError]
  }
}
