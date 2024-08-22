import type { WeakModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModuleFromNode } from '@xyo-network/react-node'
import type { WitnessInstance } from '@xyo-network/witness-model'
import { isWitnessInstance } from '@xyo-network/witness-model'

export const useWeakWitnessFromNode = (
  nameOrAddressOrInstance?: string | WitnessInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<WitnessInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<WitnessInstance>(nameOrAddressOrInstance, { identity: isWitnessInstance, ...config })
}
