import type { PromiseQueue } from '../classes/index.ts'

export interface IndexedResultsQueue {
  /** Optional queue to manage polling requests */
  queue?: PromiseQueue
  /** Optional identifier for tasks in the queue */
  taskId?: string
}
