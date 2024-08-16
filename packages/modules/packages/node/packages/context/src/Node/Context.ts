import { createContextEx } from '@xyo-network/react-shared'

import type { NodeContextState } from './State.ts'

export const NodeContext = createContextEx<NodeContextState>()
