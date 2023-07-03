import { ArchivistModule } from '@xyo-network/archivist'
import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useArchivistFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, logger?: Logger) =>
  useModuleFromNode<ArchivistModule>(nameOrAddressOrFilter, logger)
