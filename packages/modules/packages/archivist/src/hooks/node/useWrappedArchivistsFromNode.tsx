import { ArchivistWrapper } from '@xyo-network/archivist'
import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'

export const useWrappedArchivistsFromNode = WrappedModulesFromNodeHookFactory.create(ArchivistWrapper, 'useWrappedArchivistsFromNode')
