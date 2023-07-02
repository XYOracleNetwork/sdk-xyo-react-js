import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'

export const useWrappedArchivistFromNode = WrappedModuleFromNodeHookFactory.create(ArchivistWrapper, 'useWrappedArchivistFromNode')
