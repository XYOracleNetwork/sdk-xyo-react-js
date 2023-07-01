import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedNodeModuleHookFactory } from '@xyo-network/react-node'

export const useNodeArchivist = WrappedNodeModuleHookFactory(ArchivistWrapper, 'useArchivist')
