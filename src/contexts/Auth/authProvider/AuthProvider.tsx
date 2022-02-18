import { useReducer } from 'react'

import { AuthContext } from '../AuthContext'
import { authReducer } from '../AuthReducer'
import { AuthState } from '../AuthStateTypes'
import { DefaultState } from '../DefaultState'
import { useHydrateState } from '../useHydrateState'
import { AuthErrorDialog } from './AuthErrorDialog'
import { useAuthInterceptors } from './authInterceptors'

interface AuthProviderProps {
  authState: Partial<AuthState>
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, authState }) => {
  const defaultStateWithServices = { ...DefaultState, ...authState }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  useAuthInterceptors(authState.apiDomain as string, dispatch)
  useHydrateState(state, dispatch)

  const value = { dispatch, state }

  return (
    <>
      <AuthErrorDialog authState={state} dispatch={dispatch} />
      <AuthContext.Provider value={value}>
        {/* { TODO - add login modal } */}
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider }
