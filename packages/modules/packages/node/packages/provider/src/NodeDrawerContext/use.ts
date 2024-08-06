import { NodeDrawerContext } from '@xyo-network/react-node-context'
import { useContextEx } from '@xyo-network/react-shared'

export const useNodeDrawer = (required = true) => useContextEx(NodeDrawerContext, 'NodeDrawer', required)
