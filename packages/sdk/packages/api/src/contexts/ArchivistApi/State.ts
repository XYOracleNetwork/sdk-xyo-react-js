import { XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/api'

/** @deprecated */
export type XyoApiErrorCallback = (response: XyoApiResponse) => void

export interface ApiState {
  api?: XyoArchivistApi
  currentToken?: string
  successHistory?: XyoApiResponse[]
  responseHistory?: XyoApiResponse[]
  failureHistory?: XyoApiResponse[]
  errorHistory?: XyoApiError[]
}
