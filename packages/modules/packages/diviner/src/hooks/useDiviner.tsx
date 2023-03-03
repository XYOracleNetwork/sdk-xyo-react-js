import { DivinerModule, DivinerWrapper } from '@xyo-network/diviner'
import { createUseModuleHook, useNode } from '@xyo-network/react-node'

export const useDiviner = createUseModuleHook<DivinerModule, DivinerWrapper>((module) => DivinerWrapper.wrap(module), useNode)
