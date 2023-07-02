import { DivinerWrapper } from '@xyo-network/diviner'
import { WrappedModuleHookFactory } from '@xyo-network/react-module'

export const useWrappedDiviner = WrappedModuleHookFactory.create(DivinerWrapper)
