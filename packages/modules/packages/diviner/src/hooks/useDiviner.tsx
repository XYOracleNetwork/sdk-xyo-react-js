import { DivinerModule, DivinerWrapper } from '@xyo-network/diviner'
import { useModule, WrappedModuleHookFactory } from '@xyo-network/react-node'

export const useDiviner = (nameOrAddress?: string) => useModule<DivinerModule>(nameOrAddress)

export const useWrappedDiviner = WrappedModuleHookFactory(DivinerWrapper)
