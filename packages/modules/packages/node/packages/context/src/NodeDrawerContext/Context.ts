import { createContextEx } from '@xyo-network/react-shared'

import type { NodeDrawerState } from './State.ts'

export const NodeDrawerContext = createContextEx<NodeDrawerState>()
