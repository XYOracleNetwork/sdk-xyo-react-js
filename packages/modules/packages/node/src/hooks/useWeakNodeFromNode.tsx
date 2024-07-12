import { isNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { useWeakModuleFromNode } from './useWeakModuleFromNode.js'
import { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.js'

export const useWeakNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<NodeInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<NodeInstance>(nameOrAddressOrInstance, { identity: isNodeInstance, ...config })
}
