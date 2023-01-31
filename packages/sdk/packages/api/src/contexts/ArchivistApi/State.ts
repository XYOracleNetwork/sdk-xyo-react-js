import { XyoArchivistApi } from '@xyo-network/api'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api-models'

/** @deprecated */
export type XyoApiErrorCallback = (response: XyoApiResponse) => void

export interface ApiState {
  api?: XyoArchivistApi
  currentToken?: string
  errorHistory?: XyoApiError[]
  failureHistory?: XyoApiResponse[]
  responseHistory?: XyoApiResponse[]
  successHistory?: XyoApiResponse[]
}
