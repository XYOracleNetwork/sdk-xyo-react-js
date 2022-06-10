/* eslint-disable deprecation/deprecation */
import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { ApiLoggerState } from './ApiLoggerTypes'
import { ApiLoggerContext } from './Context'

/** @deprecated use archivist-api to handle api call logging */
export const ApiErrorsProvider: React.FC<WithChildren> = ({ children }) => {
  const [apiCalls, setApiCalls] = useState<ApiLoggerState['calls']>([])

  const value = {
    calls: apiCalls,
    setApiCalls,
  }

  return <ApiLoggerContext.Provider value={value}>{children}</ApiLoggerContext.Provider>
}
