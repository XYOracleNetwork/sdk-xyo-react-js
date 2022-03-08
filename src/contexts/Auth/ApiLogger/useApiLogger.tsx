import { Dispatch, SetStateAction, useContext } from 'react'

import { ApiCall, ApiLoggerState } from './ApiLoggerTypes'
import { ApiLoggerContext } from './Context'

interface ApiLoggerContextFixed extends ApiLoggerState {
  setApiCalls: Dispatch<SetStateAction<ApiCall[]>>
}

const useApiLogger = () => {
  const context = useContext(ApiLoggerContext)

  return context as ApiLoggerContextFixed
}

export { useApiLogger }
