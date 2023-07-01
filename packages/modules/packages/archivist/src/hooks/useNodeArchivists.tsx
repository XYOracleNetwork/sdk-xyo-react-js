import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedNodeModulesHookFactory } from '@xyo-network/react-node'

export const useNodeArchivists = WrappedNodeModulesHookFactory(ArchivistWrapper, 'useNodeArchivists')
