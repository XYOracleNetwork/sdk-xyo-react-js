import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { useModule, WrappedModuleHookFactory } from '@xyo-network/react-node'

export const useArchivist = (nameOrAddress?: string) => useModule<ArchivistModule>(nameOrAddress)

export const useWrappedArchivist = WrappedModuleHookFactory(ArchivistWrapper)
