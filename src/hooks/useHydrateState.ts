import React, { useEffect, useState } from 'react'

import { AuthAction, AuthActionTypes, AuthState } from '../contexts'

const useHydrateState = (state: AuthState, dispatch: React.Dispatch<AuthAction>) => {
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isFirstRun) {
      localStorage.setItem('AuthState', JSON.stringify(state))
    }
  }, [state, isFirstRun])
}

export { useHydrateState }
