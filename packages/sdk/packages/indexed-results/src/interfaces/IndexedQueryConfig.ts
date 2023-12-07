import { Payload } from '@xyo-network/payload-model'

export interface IndexedQueryConfig {
  freshnessThreshold?: Payload
  generateWhenNotFound?: boolean
  listenForNewResults?: boolean
  query: Payload
  skipCache?: boolean
}
