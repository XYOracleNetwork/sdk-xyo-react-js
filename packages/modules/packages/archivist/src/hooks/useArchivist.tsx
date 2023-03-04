import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { createUseModuleHook } from '@xyo-network/react-node'

export const useArchivist = createUseModuleHook<ArchivistModule, ArchivistWrapper>((module) => ArchivistWrapper.tryWrap(module))
