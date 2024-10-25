import { createContext } from 'react'

import type { ErrorReporterContextState } from './State.ts'

/** @deprecated use from @xylabs/react-error instead */
export const ErrorReporterContext = createContext<ErrorReporterContextState>({})
