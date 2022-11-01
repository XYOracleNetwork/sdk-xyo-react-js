import { XyoApiError, XyoApiResponse } from '@xyo-network/api-models'
import { Dispatch, SetStateAction } from 'react'

export interface XyoApiLoggedResponse extends XyoApiResponse {
  logged: string
}

/** @deprectated use XyoApiLoggedResponse instead */
export type AxiosLoggedResponse = XyoApiLoggedResponse

export interface XypApiLoggedError extends XyoApiError {
  logged: string
}

/** @deprectated use XypApiLoggedError instead */
export type AxiosLoggedError = XypApiLoggedError

export type ApiCall = XypApiLoggedError | XyoApiLoggedResponse

export interface ApiLoggerState {
  calls: ApiCall[]
  setApiCalls?: Dispatch<SetStateAction<ApiLoggerState['calls']>>
}
