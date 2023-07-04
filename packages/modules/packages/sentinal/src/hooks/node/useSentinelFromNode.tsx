import { Logger } from '@xyo-network/core'
import { useModuleFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'

export const useSentinelFromNode = (nameOrAddress?: string, up = false, logger?: Logger) =>
  useModuleFromNode<SentinelModule>(nameOrAddress, up, logger)
