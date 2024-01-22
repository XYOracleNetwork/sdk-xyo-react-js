import { delay } from '@xylabs/delay'
import { Promisable } from '@xylabs/promise'
import { AnyObject } from '@xyo-network/object'

export interface RetryConfig<T = AnyObject> {
  backoff?: number
  complete?: (result?: T) => boolean
  interval?: number
  retries?: number
}

export const retry = async <T = AnyObject,>(func: () => Promisable<T | undefined>, config?: RetryConfig<T>): Promise<T | undefined> => {
  const { complete = (value: T | undefined) => value !== undefined, retries = 0, interval = 100, backoff = 2 } = config ?? {}
  const result = await func()
  if (complete(result)) {
    return result
  }
  if (retries <= 0) {
    return undefined
  }
  await delay(interval)
  return retry(func, { backoff, complete, interval: interval * backoff, retries: retries - 1 })
}
