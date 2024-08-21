import type { WeakModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModuleFromNode } from '@xyo-network/react-node'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import { isSentinelInstance } from '@xyo-network/sentinel-model'

export const useWeakSentinelFromNode = (
  nameOrAddressOrInstance?: string | SentinelInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<SentinelInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<SentinelInstance>(nameOrAddressOrInstance, {
    identity: isSentinelInstance, ...config,
  })
}
