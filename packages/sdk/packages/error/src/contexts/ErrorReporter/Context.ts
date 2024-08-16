import { createContext } from 'react'

import type { ErrorReporterContextState } from './State.ts'

export const ErrorReporterContext = createContext<ErrorReporterContextState>({})
