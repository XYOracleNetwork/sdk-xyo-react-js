import { WithChildren } from '@xylabs/react-shared'
import { useReducer } from 'react'

import { AuthContext } from '../Context'
import { authReducer, AuthState, defaultState } from '../State'

export interface AuthProviderProps {
  authState: Partial<AuthState>
}

export const AuthProvider: React.FC<WithChildren<AuthProviderProps>> = ({ children, authState }) => {
  const defaultStateWithServices = { ...defaultState(), ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  const value = { dispatch, state }

  return <AuthContext.Provider value={value}>{state ? children : null}</AuthContext.Provider>
}
