import React, { useEffect, useState } from 'react'

import { AuthAction, AuthActionTypes, AuthState } from './AuthStateTypes'

type AuthStateKeys = keyof AuthState
type SaveableAuthStateProps = Extract<AuthStateKeys, 'jwtToken' | 'loggedInAccount'>

const useHydrateState = (
  state: AuthState,
  dispatch: React.Dispatch<AuthAction>,
  keysToSave: SaveableAuthStateProps[]
) => {
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true)

  useEffect(() => {
    const savedState = localStorage.getItem('AuthState') as string
    try {
      const authState = JSON.parse(savedState)
      if (authState !== null) {
        dispatch({ payload: authState, type: AuthActionTypes.RehydrateState })
      }
      localStorage.removeItem('AuthState')
      setIsFirstRun(false)
    } catch (e) {
      console.error('error parsing saved state from localStorage')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isFirstRun) {
      const saveableValues = keysToSave.reduce((previous, key) => {
        previous[key] = state[key]
        return previous
      }, {} as AuthState)

      localStorage.setItem('AuthState', JSON.stringify(saveableValues))
    }
  }, [state, isFirstRun, keysToSave])
}

export { useHydrateState }
