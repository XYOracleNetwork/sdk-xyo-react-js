import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useDivinerFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) =>
  useModuleFromNode<DivinerModule>(nameOrAddress, up, logger)
