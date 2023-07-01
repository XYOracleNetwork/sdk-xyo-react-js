import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'

export const useNodeArchivists = WrappedModulesFromNodeHookFactory.create(ArchivistWrapper, 'useNodeArchivists')
