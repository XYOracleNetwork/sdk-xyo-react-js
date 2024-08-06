import { createContext } from 'react'

import { ErrorReporterContextState } from './State.ts'

export const ErrorReporterContext = createContext<ErrorReporterContextState>({})
