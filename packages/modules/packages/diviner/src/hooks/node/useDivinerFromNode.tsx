import { Logger } from '@xyo-network/core'
import { DivinerInstance } from '@xyo-network/diviner'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useDivinerFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) =>
  useModuleFromNode<DivinerInstance>(nameOrAddress, up, logger)
