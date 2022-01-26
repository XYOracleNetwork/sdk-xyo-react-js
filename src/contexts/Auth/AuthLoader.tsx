import { useEffect, useReducer, useState } from 'react'

import { AuthContext } from './AuthContext'
import { authReducer } from './AuthReducer'
import { AuthActionTypes, IAuthService } from './AuthStateTypes'
import { DefaultState } from './DefaultState'

interface AuthLoaderProps {
  authServiceList: IAuthService[]
}

const AuthLoader: React.FC<AuthLoaderProps> = ({ children, authServiceList }) => {
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true)
  const [state, dispatch] = useReducer(authReducer, { ...DefaultState, ...authServiceList })

  useEffect(() => {
    const savedState = localStorage.getItem('AuthState') as string
    try {
      const authState = JSON.parse(savedState)
      if (authState !== null) {
        dispatch({ payload: authState, type: AuthActionTypes.RehydrateState })
      }
      setIsFirstRun(false)
    } catch (e) {
      console.error('error parsing saved state from localStorage')
    }
  }, [])

  useEffect(() => {
    if (!isFirstRun) {
      localStorage.setItem('AuthState', JSON.stringify(state))
    }
  }, [state, isFirstRun])

  const value = { dispatch, state }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthLoader }
