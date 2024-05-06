import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { useWeakModuleFromNode, WeakModuleFromNodeConfig } from '@xyo-network/react-node'

export const useWeakDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<DivinerInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<DivinerInstance>(nameOrAddressOrInstance, { identity: isDivinerInstance, ...config })
}
