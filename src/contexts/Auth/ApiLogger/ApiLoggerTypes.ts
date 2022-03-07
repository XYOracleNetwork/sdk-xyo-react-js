import { AxiosError, AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export type ApiCall = AxiosResponse | AxiosError

export interface ApiLoggerState {
  calls: ApiCall[]
  setApiCalls?: Dispatch<SetStateAction<ApiLoggerState['calls']>>
}
