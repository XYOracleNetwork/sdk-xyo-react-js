import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { WrappedModuleHookFactory } from '@xyo-network/react-module'

export const useWrappedArchivist = WrappedModuleHookFactory.create(ArchivistWrapper)
