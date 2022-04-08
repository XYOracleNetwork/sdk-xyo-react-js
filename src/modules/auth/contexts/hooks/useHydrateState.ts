import React, { useEffect, useState } from 'react'

import { AuthActionType } from '../ActionType'
import { AuthAction, AuthState } from '../State'

export type SaveableAuthStateProps = Extract<keyof AuthState, 'jwtToken' | 'loggedInAccount'>

const LOCAL_STORAGE_NAME = 'AuthState'

const loadAuthStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_NAME)
  if (savedState) {
    try {
      return JSON.parse(savedState) as AuthState
    } catch (ex) {
      localStorage.removeItem(LOCAL_STORAGE_NAME)
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

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(saveableValues))
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
        dispatch({ payload: authState, type: AuthActionType.RehydrateState })
      }
      setIsFirstRun(false)
    } else {
      saveAuthStateToLocalStorage(state, keysToSave)
    }
  }, [dispatch, isFirstRun, state, keysToSave])
}
