import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { createUseModuleHook } from '@xyo-network/react-node'

export const useArchivist = createUseModuleHook<ArchivistModule, ArchivistWrapper>(ArchivistWrapper.wrap)
