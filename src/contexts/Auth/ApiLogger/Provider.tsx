import { useState } from 'react'

import { ApiLoggerState } from './ApiLoggerTypes'
import { ApiLoggerContext } from './Context'

export const ApiErrorsProvider: React.FC = ({ children }) => {
  const [apiCalls, setApiCalls] = useState<ApiLoggerState['calls']>([])

  const value = {
    calls: apiCalls,
    setApiCalls,
  }

  return <ApiLoggerContext.Provider value={value}>{children}</ApiLoggerContext.Provider>
}
