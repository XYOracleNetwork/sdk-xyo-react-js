import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'

import { useModulesFromNode } from './useModulesFromNode'

export const useNodesFromNode = (filter?: ModuleFilter, logger?: Logger) => useModulesFromNode<NodeModule>(filter, logger)
