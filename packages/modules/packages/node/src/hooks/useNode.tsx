import { NodeModule, NodeWrapper } from '@xyo-network/node'

import { createUseModuleHook } from './createUseModuleHook'
import { useProvidedNode } from './useProvidedNode'

export const useNode = createUseModuleHook<NodeModule, NodeWrapper>(NodeWrapper.wrap, (_nameOrAddress?: string, _wrap?: true) => [
  useProvidedNode(true).pop(),
  undefined,
])
