import { createContextEx } from '@xylabs/react-shared'

import type { PromiseQueueState } from './State.ts'

export const PromiseQueueContext = createContextEx<PromiseQueueState>()
