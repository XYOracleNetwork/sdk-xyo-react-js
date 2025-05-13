import { createContextEx } from '@xylabs/react-shared'

import type { HashSelectionHistoryState } from './State.ts'

export const HashSelectionHistoryContext = createContextEx<HashSelectionHistoryState>()
