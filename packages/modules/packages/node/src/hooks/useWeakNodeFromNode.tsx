import { isNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
import { useWeakModuleFromNode } from './useWeakModuleFromNode'

export const useWeakNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<NodeInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<NodeInstance>(nameOrAddressOrInstance, { identity: isNodeInstance, ...config })
}
