import { Logger } from '@xyo-network/core'
import { DivinerModule } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'

export const useDivinersFromNode = (filter?: ModuleFilter, up = false, logger?: Logger) => useModulesFromNode<DivinerModule>(filter, up, logger)
