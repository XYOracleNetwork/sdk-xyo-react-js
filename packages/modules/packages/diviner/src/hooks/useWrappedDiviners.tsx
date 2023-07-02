import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedModulesHookFactory } from '@xyo-network/react-module'

export const useWrappedDiviners = WrappedModulesHookFactory.create(DivinerWrapper)
