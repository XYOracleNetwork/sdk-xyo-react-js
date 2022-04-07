import { createContext } from 'react'

import { ApiLoggerState } from './ApiLoggerTypes'

const ApiLoggerContext = createContext<ApiLoggerState>({ calls: [], setApiCalls: undefined })

export { ApiLoggerContext }
