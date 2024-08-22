import type { ArchivistInstance } from '@xyo-network/archivist-model'
import { isArchivistInstance } from '@xyo-network/archivist-model'
import type { WeakModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<ArchivistInstance> | undefined, Error | undefined] => {
  return useWeakModuleFromNode<ArchivistInstance>(nameOrAddressOrInstance, { identity: isArchivistInstance, ...config })
}
