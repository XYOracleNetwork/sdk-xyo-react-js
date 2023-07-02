import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'

export const useWrappedDivinerFromNode = WrappedModuleFromNodeHookFactory.create(DivinerWrapper, 'useWrappedDivinerFromNode')
