import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModulesFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'

export const useSentinelsFromNode = (filter?: ModuleFilter, logger?: Logger) => useModulesFromNode<SentinelModule>(filter, logger)