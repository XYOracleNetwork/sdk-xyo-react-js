import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedModulesHookFactory } from '@xyo-network/react-node'

export const useDiviners = WrappedModulesHookFactory(DivinerWrapper, 'useDiviners')
