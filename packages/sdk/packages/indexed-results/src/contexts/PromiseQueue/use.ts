import { useContextEx } from '@xyo-network/react-shared'

import { PromiseQueueContext } from './Context.ts'
import type { PromiseQueueState } from './State.ts'

export const usePromiseQueue = (required = true) => useContextEx<PromiseQueueState>(PromiseQueueContext, 'PromiseQueue', required)
