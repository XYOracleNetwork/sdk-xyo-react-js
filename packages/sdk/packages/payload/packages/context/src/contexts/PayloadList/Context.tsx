import { createContextEx } from '@xylabs/react-shared'

import type { PayloadListState } from './State.ts'

export const PayloadListContext = createContextEx<PayloadListState>()
