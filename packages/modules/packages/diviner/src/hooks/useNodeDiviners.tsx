import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedNodeModulesHookFactory } from '@xyo-network/react-node'

export const useNodeDiviners = WrappedNodeModulesHookFactory(DivinerWrapper, 'useNodeDiviners')
