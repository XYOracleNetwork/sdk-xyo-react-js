import { useContext } from 'react'

import { ErrorReporterContext } from './Context.ts'

export const useErrorReporter = () => {
  const context = useContext(ErrorReporterContext)
  if (context === undefined) {
    console.warn('useErrorReporter must be used within a ErrorReporterContext')
  }

  return context ?? {}
}
