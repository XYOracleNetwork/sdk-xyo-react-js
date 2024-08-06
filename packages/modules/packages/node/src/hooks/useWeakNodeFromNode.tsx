import { isNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { useWeakModuleFromNode } from './useWeakModuleFromNode.ts'
import { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

export const useWeakNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<NodeInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<NodeInstance>(nameOrAddressOrInstance, { identity: isNodeInstance, ...config })
}
