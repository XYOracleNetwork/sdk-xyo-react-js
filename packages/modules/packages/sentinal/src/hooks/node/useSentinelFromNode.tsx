import { Logger } from '@xyo-network/core'
import { ModuleFilter } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'

export const useSentinelFromNode = (nameOrAddressOrFilter?: string | ModuleFilter, up = false, logger?: Logger) =>
  useModuleFromNode<SentinelModule>(nameOrAddressOrFilter, up, logger)
