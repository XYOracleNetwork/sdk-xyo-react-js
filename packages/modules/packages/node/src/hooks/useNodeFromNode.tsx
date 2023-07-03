import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, logger?: Logger) =>
  useModuleFromNode<NodeModule>(nameOrAddressOrFilter, logger)
