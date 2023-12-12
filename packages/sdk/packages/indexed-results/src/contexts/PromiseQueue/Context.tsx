import { createContextEx } from '@xyo-network/react-shared'

import { PromiseQueueState } from './State'

export const PromiseQueueContext = createContextEx<PromiseQueueState>()
