import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useReducer } from 'react'

import { AuthContext } from '../Context'
import { authReducer, AuthState, defaultState } from '../State'
import { localStorageAuthProviderService } from './lib'

export interface AuthProviderProps {
  authState: Partial<AuthState>
}

export const AuthProvider: React.FC<WithChildren<AuthProviderProps>> = ({ children, authState }) => {
  const { loadAuthStateFromLocalStorage, saveAuthStateToLocalStorage } = localStorageAuthProviderService
  const savedAuthState = loadAuthStateFromLocalStorage()
  const defaultStateWithServices = { ...defaultState(), ...savedAuthState, ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  useEffect(() => {
    saveAuthStateToLocalStorage(state, ['jwtToken', 'loggedInAccount'])
  }, [saveAuthStateToLocalStorage, state])

  const value = { dispatch, state }
  console.log(state)

  return <AuthContext.Provider value={value}>{state ? children : null}</AuthContext.Provider>
}
