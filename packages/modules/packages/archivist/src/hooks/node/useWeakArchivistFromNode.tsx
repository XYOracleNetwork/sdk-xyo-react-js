import { ArchivistInstance, isArchivistInstance } from '@xyo-network/archivist-model'
import { useWeakModuleFromNode, WeakModuleFromNodeConfig } from '@xyo-network/react-node'

export const useWeakArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<ArchivistInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<ArchivistInstance>(nameOrAddressOrInstance, { identity: isArchivistInstance, ...config })
}
