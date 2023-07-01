import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'

export const useArchivistFromNode = WrappedModuleFromNodeHookFactory.create(ArchivistWrapper, 'useArchivistFromNode')
