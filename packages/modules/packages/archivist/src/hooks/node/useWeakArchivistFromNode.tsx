import { ArchivistInstance, isArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<ArchivistInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<ArchivistInstance>(nameOrAddressOrInstance, { identity: isArchivistInstance, ...config })
}
