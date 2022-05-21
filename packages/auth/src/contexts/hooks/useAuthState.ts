import { useContext } from 'react'

import { AuthContext } from '../Context'
import { AuthContextProps } from '../State'

export const useAuthState = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.warn('useAuthState used outside a AuthContextProvider')
  }
  return context ?? {}
}
