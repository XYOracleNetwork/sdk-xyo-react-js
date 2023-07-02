import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { WrappedModulesHookFactory } from '@xyo-network/react-module'

export const useWrappedArchivists = WrappedModulesHookFactory.create(ArchivistWrapper)
