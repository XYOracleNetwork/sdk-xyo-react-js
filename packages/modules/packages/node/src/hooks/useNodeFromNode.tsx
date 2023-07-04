import { Logger } from '@xyo-network/core'
import { NodeModule } from '@xyo-network/node'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) => useModuleFromNode<NodeModule>(nameOrAddress, up, logger)
