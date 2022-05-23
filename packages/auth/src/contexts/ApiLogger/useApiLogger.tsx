/* eslint-disable deprecation/deprecation */
import { Dispatch, SetStateAction, useContext } from 'react'

import { ApiCall, ApiLoggerState } from './ApiLoggerTypes'
import { ApiLoggerContext } from './Context'

/** @deprecated use archivist-api to handle api call logging */
export interface ApiLoggerContextFixed extends ApiLoggerState {
  setApiCalls: Dispatch<SetStateAction<ApiCall[]>>
}

export const useApiLogger = () => {
  const context = useContext(ApiLoggerContext)

  return context as ApiLoggerContextFixed
}
