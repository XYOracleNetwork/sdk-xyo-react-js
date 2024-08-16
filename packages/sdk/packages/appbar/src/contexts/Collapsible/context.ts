import { createContextEx } from '@xyo-network/react-shared'

import type { CollapsibleState } from './State.ts'

export const CollapsibleContext = createContextEx<CollapsibleState>()
