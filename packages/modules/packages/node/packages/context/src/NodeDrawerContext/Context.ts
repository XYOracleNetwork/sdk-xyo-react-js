import { createContextEx } from '@xylabs/react-shared'

import type { NodeDrawerState } from './State.ts'

export const NodeDrawerContext = createContextEx<NodeDrawerState>()
