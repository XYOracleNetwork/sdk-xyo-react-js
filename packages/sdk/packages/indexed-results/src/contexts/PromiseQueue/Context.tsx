import { createContextEx } from '@xyo-network/react-shared'

import { PromiseQueueState } from './State.js'

export const PromiseQueueContext = createContextEx<PromiseQueueState>()
