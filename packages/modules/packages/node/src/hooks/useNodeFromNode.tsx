import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, up = false, logger?: Logger) =>
  useModuleFromNode<NodeModule>(nameOrAddressOrFilter, up, logger)
