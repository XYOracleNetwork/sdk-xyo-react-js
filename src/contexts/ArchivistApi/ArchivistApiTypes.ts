import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'

export interface ArchivistApiState {
  api?: XyoArchivistApi
  currentToken?: string
}
