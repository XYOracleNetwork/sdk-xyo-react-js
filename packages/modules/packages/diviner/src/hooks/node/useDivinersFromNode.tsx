import { Logger } from '@xyo-network/core'
import { DivinerInstance, DivinerModule } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'

export const useDivinersFromNode = (filter?: ModuleFilter, up?: boolean, logger?: Logger) => useModulesFromNode<DivinerInstance>(filter, up, logger)
