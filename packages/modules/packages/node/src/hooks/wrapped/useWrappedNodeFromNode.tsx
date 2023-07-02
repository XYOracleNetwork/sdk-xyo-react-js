import { NodeWrapper } from '@xyo-network/node'

import { WrappedModuleFromNodeHookFactory } from './WrappedModuleFromNodeHookFactory'

export const useWrappedNodeFromNode = WrappedModuleFromNodeHookFactory.create(NodeWrapper, 'useWrappedNodeFromNode')
