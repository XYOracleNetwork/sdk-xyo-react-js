import { useRollbar } from '@rollbar/react'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'
import type Rollbar from 'rollbar'

import { ErrorReporterContext } from './Context.ts'

export interface ErrorReporterProviderProps {
  rollbar: Rollbar
}

const ErrorReporterProvider: React.FC<WithChildren<ErrorReporterProviderProps>> = ({ children, rollbar: rollbarProp }) => {
  let rollbarFromHook: Rollbar | undefined
  // safely call the hook
  try {
    rollbarFromHook = useRollbar()
  } catch {}

  const rollbar = rollbarProp ?? rollbarFromHook

  if (!rollbar) {
    throw new Error('ErrorReporterProvider unable to find a Rollbar instance either passed as prop or from Provider')
  }

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <ErrorReporterContext.Provider value={{ rollbar }}>{children}</ErrorReporterContext.Provider>
}

export { ErrorReporterProvider }
