import type { ContextExState } from '@xyo-network/react-shared'

import type { PromiseQueue } from '../../classes/index.ts'

export interface PromiseQueueState extends ContextExState {
  queue?: PromiseQueue
}
