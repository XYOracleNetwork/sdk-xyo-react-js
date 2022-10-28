import { XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/api'

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export type XyoApiErrorCallback = (response: XyoApiResponse) => void

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export interface ArchivistApiState {
  api?: XyoArchivistApi
  currentToken?: string
  successHistory?: XyoApiResponse[]
  responseHistory?: XyoApiResponse[]
  failureHistory?: XyoApiResponse[]
  errorHistory?: XyoApiError[]
}
