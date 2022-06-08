import { useContext } from 'react'

import { AuthServiceContext } from './Context'
import { AuthServiceState } from './State'

export const useAuthService = (): AuthServiceState => {
  const context = useContext(AuthServiceContext)
  if (context === undefined) {
    console.warn('useAuthService used outside a AuthServiceContextProvider')
  }
  return context ?? {}
}
