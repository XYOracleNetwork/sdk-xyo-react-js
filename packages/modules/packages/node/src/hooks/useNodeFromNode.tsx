import { Logger } from '@xyo-network/core'
import { NodeInstance } from '@xyo-network/node'

import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddress?: string, up?: boolean, logger?: Logger) => useModuleFromNode<NodeInstance>(nameOrAddress, up, logger)
