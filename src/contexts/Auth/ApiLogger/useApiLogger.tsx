import { AxiosError, AxiosResponse } from 'axios'
import { Dispatch, SetStateAction, useContext } from 'react'

import { ApiLoggerState } from './ApiLoggerTypes'
import { ApiLoggerContext } from './Context'

interface ApiLoggerContextFixed extends ApiLoggerState {
  setApiCalls: Dispatch<SetStateAction<(AxiosResponse | AxiosError)[]>>
}

const useApiLogger = () => {
  const context = useContext(ApiLoggerContext)

  return context as ApiLoggerContextFixed
}

export { useApiLogger }
