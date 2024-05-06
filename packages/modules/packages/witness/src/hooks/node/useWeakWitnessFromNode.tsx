import { useWeakModuleFromNode, WeakModuleFromNodeConfig } from '@xyo-network/react-node'
import { isWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const useWeakWitnessFromNode = (
  nameOrAddressOrInstance?: string | WitnessInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<WitnessInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<WitnessInstance>(nameOrAddressOrInstance, { identity: isWitnessInstance, ...config })
}
