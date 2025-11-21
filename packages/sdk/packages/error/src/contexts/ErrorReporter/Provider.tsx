import { useRollbar } from '@rollbar/react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import type Rollbar from 'rollbar'

import { ErrorReporterContext } from './Context.ts'

/** @deprecated use from @xylabs/react-error instead */
export interface ErrorReporterProviderProps {
  rollbar: Rollbar
}
/** @deprecated use from @xylabs/react-error instead */
export const ErrorReporterProvider: React.FC<PropsWithChildren<ErrorReporterProviderProps>> = ({ children, rollbar: rollbarProp }) => {
  let rollbarFromHook: Rollbar | undefined
  // safely call the hook
  try {
    rollbarFromHook = useRollbar()
  } catch {}

  const rollbar = rollbarProp ?? rollbarFromHook

  if (!rollbar) {
    throw new Error('ErrorReporterProvider unable to find a Rollbar instance either passed as prop or from Provider')
  }

  return <ErrorReporterContext value={{ rollbar }}>{children}</ErrorReporterContext>
}
