import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useDivinerFromNode = (nameOrAddress?: string, up = false, logger?: Logger) => useModuleFromNode<DivinerModule>(nameOrAddress, up, logger)
