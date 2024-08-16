import { createContextEx } from '@xyo-network/react-shared'

import type { StandardNodesState } from './State.ts'

export const StandardNodesContext = createContextEx<StandardNodesState>()
