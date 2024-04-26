import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<DivinerInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<DivinerInstance>(nameOrAddressOrInstance, { identity: isDivinerInstance, ...config })
}
