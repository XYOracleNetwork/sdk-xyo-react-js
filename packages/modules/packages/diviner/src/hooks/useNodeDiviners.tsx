import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'

export const useNodeDiviners = WrappedModulesFromNodeHookFactory.create(DivinerWrapper, 'useNodeDiviners')
