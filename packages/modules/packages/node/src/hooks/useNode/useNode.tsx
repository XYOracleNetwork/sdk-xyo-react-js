import { NodeModule, NodeWrapper } from '@xyo-network/node'

import { createUseModuleHook } from '../useModule'

export const useNode = createUseModuleHook<NodeModule, NodeWrapper>(NodeWrapper.wrap)
