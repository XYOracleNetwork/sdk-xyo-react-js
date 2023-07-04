import { Logger } from '@xyo-network/core'
import { useModuleFromNode } from '@xyo-network/react-node'
import { SentinelModule } from '@xyo-network/sentinel'

export const useSentinelFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) =>
  useModuleFromNode<SentinelModule>(nameOrAddress, up, logger)
