import { createContext, useContext } from 'react'

import { AuthContextType } from './AuthStateTypes'

const AuthContext = createContext<AuthContextType>(undefined)

const useAuthState = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthContextProvider')
  }
  return context
}

export { AuthContext, useAuthState }
