import { useReducer } from 'react'

import { AuthContext } from './AuthContext'
import { authReducer } from './AuthReducer'
import { IAuthService } from './AuthStateTypes'
import { DefaultState } from './DefaultState'
import { useHydrateState } from './useHydrateState'

interface AuthLoaderProps {
  authServiceList: IAuthService[]
}

const AuthLoader: React.FC<AuthLoaderProps> = ({ children, authServiceList }) => {
  const defaultStateWithServices = { ...DefaultState, ...{ authServiceList } }
  const [state, dispatch] = useReducer(authReducer, defaultStateWithServices)

  useHydrateState(state, dispatch)

  const value = { dispatch, state }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthLoader }
