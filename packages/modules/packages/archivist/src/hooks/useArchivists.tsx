import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedModulesHookFactory } from '@xyo-network/react-node'

export const useArchivists = WrappedModulesHookFactory(ArchivistWrapper, 'useArchivists')
