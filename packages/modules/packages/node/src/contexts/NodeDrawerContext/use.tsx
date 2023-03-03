import { useContextEx } from '@xyo-network/react-shared'

import { NodeDrawerContext } from './Context'

export const useNodeDrawer = (required = true) => useContextEx(NodeDrawerContext, 'NodeDrawer', required)
