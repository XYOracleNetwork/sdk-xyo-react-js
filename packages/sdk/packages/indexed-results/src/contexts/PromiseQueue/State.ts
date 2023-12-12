import { ContextExState } from '@xyo-network/react-shared'
import { PromiseQueue } from '../../classes'

export interface PromiseQueueState extends ContextExState {
  queue?: PromiseQueue
}
