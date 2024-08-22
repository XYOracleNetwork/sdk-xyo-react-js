import type { DivinerInstance } from '@xyo-network/diviner-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import type { WeakModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<DivinerInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<DivinerInstance>(nameOrAddressOrInstance, { identity: isDivinerInstance, ...config })
}
