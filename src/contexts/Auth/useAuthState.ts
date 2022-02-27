import { useContext } from 'react'

import { AuthContext } from './AuthContext'
import { AuthContextType } from './AuthStateTypes'

export const useAuthState = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.warn('useAuthState used outside a AuthContextProvider')
  }
  return context ?? {}
}
