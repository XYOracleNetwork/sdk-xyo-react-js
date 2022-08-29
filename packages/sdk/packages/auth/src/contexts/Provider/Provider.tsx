import { WithChildren } from '@xylabs/react-shared'
import { useReducer } from 'react'

import { AuthContext } from '../Context'
import { useHydrateState } from '../hooks'
import { authReducer, AuthState, defaultState } from '../State'

export interface AuthProviderProps {
  authState: Partial<AuthState>
}

export const AuthProvider: React.FC<WithChildren<AuthProviderProps>> = ({ children, authState }) => {
  const defaultStateWithServices = { ...defaultState(), ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  useHydrateState(state, dispatch, ['jwtToken', 'loggedInAccount'])

  const value = { dispatch, state }

  return <AuthContext.Provider value={value}>{state.tokenCheckComplete ? children : null}</AuthContext.Provider>
}
