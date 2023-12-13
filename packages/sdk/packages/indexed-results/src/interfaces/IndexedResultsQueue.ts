import { PromiseQueue } from '../classes'

export interface IndexedResultsQueue {
  /** Optional queue to manage polling requests */
  queue?: PromiseQueue
  /** Optional identifier for tasks in the queue */
  taskId?: string
}
