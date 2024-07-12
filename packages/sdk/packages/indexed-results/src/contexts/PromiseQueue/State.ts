import { ContextExState } from '@xyo-network/react-shared'

import { PromiseQueue } from '../../classes/index.js'

export interface PromiseQueueState extends ContextExState {
  queue?: PromiseQueue
}
