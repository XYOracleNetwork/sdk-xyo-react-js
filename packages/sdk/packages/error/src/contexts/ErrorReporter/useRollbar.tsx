import { useContext } from 'react'

import { ErrorReporterContext } from './Context.ts'

const useRollbar = () => {
  const context = useContext(ErrorReporterContext)
  if (context === undefined) {
    console.warn('useRollbar must be used within a ErrorReporterContext')
  }

  return context ?? {}
}

export { useRollbar }
