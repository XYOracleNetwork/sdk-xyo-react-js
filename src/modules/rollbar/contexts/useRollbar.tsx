import { useContext } from 'react'

import { RollbarContext } from './Context'

const useRollbar = () => {
  const context = useContext(RollbarContext)
  if (context === undefined) {
    console.warn('useRollbar must be used within a RollbarContext')
  }

  return context ?? {}
}

export { useRollbar }
