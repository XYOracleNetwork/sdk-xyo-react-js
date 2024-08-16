import { createContextEx } from '@xyo-network/react-shared'

import type { PromiseQueueState } from './State.ts'

export const PromiseQueueContext = createContextEx<PromiseQueueState>()
