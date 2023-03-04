import { DivinerModule, DivinerWrapper } from '@xyo-network/diviner'
import { createUseModuleHook } from '@xyo-network/react-node'

export const useDiviner = createUseModuleHook<DivinerModule, DivinerWrapper>((module) => DivinerWrapper.tryWrap(module))
