import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'
import { isSentinelInstance, SentinelInstance } from '@xyo-network/sentinel-model'

export const useWeakSentinelFromNode = (
  nameOrAddressOrInstance?: string | SentinelInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<SentinelInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<SentinelInstance>(nameOrAddressOrInstance, { identity: isSentinelInstance, ...config })
}
