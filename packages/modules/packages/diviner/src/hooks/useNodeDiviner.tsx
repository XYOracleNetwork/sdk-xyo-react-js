import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedNodeModuleHookFactory } from '@xyo-network/react-node'

export const useNodeDiviner = WrappedNodeModuleHookFactory(DivinerWrapper, 'useNodeDiviner')
