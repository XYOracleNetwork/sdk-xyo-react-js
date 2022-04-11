/* eslint-disable deprecation/deprecation */
import { createContext } from 'react'

import { ApiLoggerState } from './ApiLoggerTypes'

/** @deprecated use archivist-api to handle api call logging */
const ApiLoggerContext = createContext<ApiLoggerState>({ calls: [], setApiCalls: undefined })

export { ApiLoggerContext }
