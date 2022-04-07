import { AxiosError, AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export interface AxiosLoggedResponse extends AxiosResponse {
  logged: string
}

export interface AxiosLoggedError extends AxiosError {
  logged: string
}

export type ApiCall = AxiosLoggedError | AxiosLoggedResponse

export interface ApiLoggerState {
  calls: ApiCall[]
  setApiCalls?: Dispatch<SetStateAction<ApiLoggerState['calls']>>
}
