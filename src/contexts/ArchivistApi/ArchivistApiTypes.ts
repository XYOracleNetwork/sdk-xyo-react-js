import { XyoArchivistApi, XyoAuthApi } from '@xyo-network/sdk-xyo-client-js'

export interface ArchivistApiState {
  api?: XyoArchivistApi
  authApi?: XyoAuthApi
  currentToken?: string
}
