import { useContextEx } from '@xyo-network/react-shared'

import { PromiseQueueContext } from './Context.js'
import { PromiseQueueState } from './State.js'

export const usePromiseQueue = (required = true) => useContextEx<PromiseQueueState>(PromiseQueueContext, 'PromiseQueue', required)
