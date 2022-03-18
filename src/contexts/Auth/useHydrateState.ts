import React, { useEffect, useState } from 'react'

import { AuthAction, AuthActionTypes, AuthState } from './AuthStateTypes'

type AuthStateKeys = keyof AuthState
type SaveableAuthStateProps = Extract<AuthStateKeys, 'jwtToken' | 'loggedInAccount'>

const localStorageName = 'AuthState'

const loadAuthStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(localStorageName)
  if (savedState) {
    try {
      return JSON.parse(savedState) as AuthState
    } catch (ex) {
      localStorage.removeItem(localStorageName)
      console.error(`error parsing auth state from localStorage [${ex}]`)
    }
  }
  return null
}

const saveAuthStateToLocalStorage = (state: AuthState, keysToSave: SaveableAuthStateProps[]) => {
  const saveableValues = keysToSave.reduce((previous, key) => {
    previous[key] = state[key]
    return previous
  }, {} as AuthState)

  localStorage.setItem('AuthState', JSON.stringify(saveableValues))
}

export const useHydrateState = (
  state: AuthState,
  dispatch: React.Dispatch<AuthAction>,
  keysToSave: SaveableAuthStateProps[]
) => {
  const [isFirstRun, setIsFirstRun] = useState(true)

  useEffect(() => {
    if (isFirstRun) {
      const authState = loadAuthStateFromLocalStorage()
      if (authState !== null) {
        dispatch({ payload: authState, type: AuthActionTypes.RehydrateState })
      }
      setIsFirstRun(false)
    } else {
      saveAuthStateToLocalStorage(state, keysToSave)
    }
  }, [dispatch, isFirstRun, state, keysToSave])
}
