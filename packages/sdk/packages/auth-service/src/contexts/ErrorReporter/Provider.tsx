import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'
import Rollbar from 'rollbar'

import { ErrorReporterContext } from './Context'

export interface ErrorReporterProviderProps {
  rollbar: Rollbar
}

const ErrorReporterProvider: React.FC<WithChildren<ErrorReporterProviderProps>> = ({ children, rollbar }) => {
  const [rollbarInstance, setRollBarInstance] = useState<Rollbar>()

  useEffect(() => {
    if (rollbarInstance) {
      setRollBarInstance(rollbarInstance)
    }
  }, [rollbar, rollbarInstance])

  return <ErrorReporterContext.Provider value={{ rollbar }}>{children}</ErrorReporterContext.Provider>
}

export { ErrorReporterProvider }
