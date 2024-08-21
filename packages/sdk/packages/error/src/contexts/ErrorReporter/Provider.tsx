import type { WithChildren } from '@xylabs/react-shared'
import React, { useEffect, useState } from 'react'
import type Rollbar from 'rollbar'

import { ErrorReporterContext } from './Context.ts'

export interface ErrorReporterProviderProps {
  rollbar: Rollbar
}

const ErrorReporterProvider: React.FC<WithChildren<ErrorReporterProviderProps>> = ({
  children, rollbar,
}) => {
  const [rollbarInstance, setRollBarInstance] = useState<Rollbar>()

  useEffect(() => {
    if (rollbarInstance) {
      setRollBarInstance(rollbarInstance)
    }
  }, [rollbar, rollbarInstance])

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <ErrorReporterContext.Provider value={{ rollbar }}>{children}</ErrorReporterContext.Provider>
}

export { ErrorReporterProvider }
