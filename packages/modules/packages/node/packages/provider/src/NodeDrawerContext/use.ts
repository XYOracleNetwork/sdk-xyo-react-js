import { useContextEx } from '@xylabs/react-shared'
import type { NodeDrawerState } from '@xyo-network/react-node-context'
import { NodeDrawerContext } from '@xyo-network/react-node-context'

export const useNodeDrawer = (required = true) => useContextEx<NodeDrawerState>(NodeDrawerContext, 'NodeDrawer', required)
