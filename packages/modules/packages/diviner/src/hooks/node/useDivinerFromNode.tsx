import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'

export const useDivinerFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, logger?: Logger) =>
  useModuleFromNode<DivinerModule>(nameOrAddressOrFilter, logger)
