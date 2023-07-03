import { ArchivistModule } from '@xyo-network/archivist'
import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'

export const useArchivistsFromNode = (filter?: ModuleFilter, logger?: Logger) => useModulesFromNode<ArchivistModule>(filter, logger)
