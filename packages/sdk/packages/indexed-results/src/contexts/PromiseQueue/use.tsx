import { useContextEx } from '@xyo-network/react-shared'

import { PromiseQueueContext } from './Context'
import { PromiseQueueState } from './State'

export const usePromiseQueue = (required = true) => useContextEx<PromiseQueueState>(PromiseQueueContext, 'PromiseQueue', required)
