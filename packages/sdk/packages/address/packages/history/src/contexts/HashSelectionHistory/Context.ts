import { createContextEx } from '@xyo-network/react-shared'

import type { HashSelectionHistoryState } from './State.ts'

export const HashSelectionHistoryContext = createContextEx<HashSelectionHistoryState>()
