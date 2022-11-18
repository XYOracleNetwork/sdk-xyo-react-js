import { useContextEx } from '@xyo-network/react-sdk'

import { NodeDrawerContext } from './Context'

export const useNodeDrawer = (required = true) => useContextEx(NodeDrawerContext, 'NodeDrawer', required)
