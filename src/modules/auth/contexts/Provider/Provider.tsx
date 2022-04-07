import { ReactNode, useReducer } from 'react'

import { AuthContext } from '../Context'
import { useHydrateState } from '../hooks'
import { authReducer, AuthState, defaultState } from '../State'

export interface AuthProviderProps {
  authState: Partial<AuthState>
  children?: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authState }) => {
  const defaultStateWithServices = { ...defaultState(), ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  useHydrateState(state, dispatch, ['jwtToken', 'loggedInAccount'])

  const value = { dispatch, state }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
