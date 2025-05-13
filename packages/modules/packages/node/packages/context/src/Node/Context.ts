import { createContextEx } from '@xylabs/react-shared'

import type { NodeContextState } from './State.ts'

export const NodeContext = createContextEx<NodeContextState>()
