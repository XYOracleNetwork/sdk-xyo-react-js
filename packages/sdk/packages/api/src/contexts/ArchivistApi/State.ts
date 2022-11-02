import { XyoArchivistApi } from '@xyo-network/api'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api-models'

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
