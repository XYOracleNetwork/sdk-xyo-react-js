import { Payload } from '@xyo-network/payload-model'

export interface IndexedSourceConfig {
  archivist: string
  diviner: string
  filterResults?: (results: Payload) => Promise<Payload[]>
  refreshModule?: string
  remoteDiviner?: string
  validateQueryResult: (payload: Payload) => boolean
}
