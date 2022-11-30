import { createContext } from 'react'

import { ErrorReporterContextState } from './State'

export const ErrorReporterContext = createContext<ErrorReporterContextState>({})
