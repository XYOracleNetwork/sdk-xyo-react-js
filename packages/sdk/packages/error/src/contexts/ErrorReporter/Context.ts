import { createContext } from 'react'

import { ErrorReporterContextState } from './State.js'

export const ErrorReporterContext = createContext<ErrorReporterContextState>({})
