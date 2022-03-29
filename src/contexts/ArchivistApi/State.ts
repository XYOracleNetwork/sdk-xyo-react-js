import { XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'

export interface ArchivistApiState {
  api?: XyoArchivistApi
  currentToken?: string
  successHistory?: XyoApiResponse[]
  responseHistory?: XyoApiResponse[]
  failureHistory?: XyoApiResponse[]
  errorHistory?: XyoApiError[]
}
