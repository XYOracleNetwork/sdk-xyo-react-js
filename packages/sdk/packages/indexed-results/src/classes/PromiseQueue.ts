import { EmptyObject } from '@xyo-network/core'

const DEFAULT_ACTIVE_PROMISE_LIMIT = 6

type DefaultValue = EmptyObject | null | undefined

// A single item in the queue
export interface QueueItem {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task: () => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any | PromiseLike<any>) => void
  reject: (error: Error) => void
}

/**
 * A Queue that evaluates a fixed number of Promises at a time
 */
export class PromiseQueue {
  private maxConcurrent: number
  private queue: QueueItem[]
  private runningPromises: Set<Promise<DefaultValue>> = new Set()
  private uniqueItemsSet: Set<string> // Set to store unique identifiers for tasks

  constructor(maxConcurrent: number = DEFAULT_ACTIVE_PROMISE_LIMIT) {
    this.maxConcurrent = maxConcurrent
    this.queue = []
    this.uniqueItemsSet = new Set()
  }

  addRequest<TValue>(task: QueueItem['task'], id: string): Promise<TValue> {
    if (this.uniqueItemsSet.has(id)) {
      // If the item already exists in the queue, return a stub promise
      // NOTE: We are assuming that two different callers will not ask for the same promise
      // A second request with the same id param is assumed to be from the same caller.
      return new Promise((resolve, reject) => {
        // Dummy task to maintain queue consistency
        this.queue.push({ id, reject, resolve, task: () => Promise.resolve({} as TValue) })
        // Process the queue to resolve/reject the existing promise
        void this.processQueue()
      })
    }

    this.uniqueItemsSet.add(id)

    return new Promise<TValue>((resolve, reject) => {
      const castResult = resolve as QueueItem['resolve']
      this.queue.push({ id, reject, resolve: castResult, task })
      void this.processQueue()
    })
  }

  private async processQueue(): Promise<void> {
    while (this.queue.length > 0) {
      // Check if the maximum concurrent limit is reached
      if (this.runningPromises.size >= this.maxConcurrent) {
        await Promise.race(this.runningPromises) // Wait for one of the running promises to settle
        // Continue accounts other callers adding more to the running promises
        continue
      }

      const { task, resolve, reject, id } = this.queue.shift()!
      const promise = task()

      // Add the promise to the set of running promises
      this.runningPromises.add(promise)

      try {
        const result = await promise
        this.runningPromises.delete(promise) // Remove the promise from the set after it settles
        this.uniqueItemsSet.delete(id)
        resolve(result)
      } catch (error) {
        this.runningPromises.delete(promise) // Remove the promise from the set after it settles
        this.uniqueItemsSet.delete(id)
        reject(error as Error)
      }
    }
  }
}
