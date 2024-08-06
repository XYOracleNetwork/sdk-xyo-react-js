import { createContextEx } from '@xyo-network/react-shared'

import { PromiseQueueState } from './State.ts'

export const PromiseQueueContext = createContextEx<PromiseQueueState>()
