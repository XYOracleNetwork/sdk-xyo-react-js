import type { Payload } from '@xyo-network/payload-model'

export type PollResult = Payload[] | null | undefined

export interface PollingConfig {
  initialDelay?: number
  maxDelay?: number
  /** If null, polling is continuous. */
  maxRetries: number | null
  onFoundResult?: <T extends PollResult = PollResult>(result: T) => boolean
}
