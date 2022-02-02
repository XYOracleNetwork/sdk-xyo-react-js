import { useReducer } from 'react'

import { AuthContext } from './AuthContext'
import { useAuthInterceptors } from './authInterceptors'
import { authReducer } from './AuthReducer'
import { AuthState } from './AuthStateTypes'
import { DefaultState } from './DefaultState'
import { useHydrateState } from './useHydrateState'

interface AuthLoaderProps {
  authState: Partial<AuthState>
}

const AuthLoader: React.FC<AuthLoaderProps> = ({ children, authState }) => {
  const defaultStateWithServices = { ...DefaultState, ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)
  useAuthInterceptors(state.apiDomain, dispatch)

  useHydrateState(state, dispatch)

  const value = { dispatch, state }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthLoader }
