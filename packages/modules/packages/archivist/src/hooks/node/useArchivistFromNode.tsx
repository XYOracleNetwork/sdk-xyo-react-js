import { ArchivistInstance } from '@xyo-network/archivist'
import { Logger } from '@xyo-network/core'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useArchivistFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) =>
  useModuleFromNode<ArchivistInstance>(nameOrAddress, up, logger)
