/* eslint-disable deprecation/deprecation */
import { AuthState } from '../State'

type SaveableAuthStateProps = Extract<keyof AuthState, 'jwtToken' | 'loggedInAccount'>

const LOCAL_STORAGE_NAME = 'AuthState'

/** @deprecated - built into AuthProvider */
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

/** @deprecated - built into AuthProvider */
const saveAuthStateToLocalStorage = (state: AuthState, keysToSave: SaveableAuthStateProps[]) => {
  const saveableValues = keysToSave.reduce((previous, key) => {
    previous[key] = state[key] ?? undefined
    return previous
  }, {} as AuthState)

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(saveableValues))
}

/** @deprecated - built into AuthProvider */
export const useHydrateState = (keysToSave: SaveableAuthStateProps[]) => {
  const savedAuthState = loadAuthStateFromLocalStorage()
  if (savedAuthState !== null) {
    saveAuthStateToLocalStorage(savedAuthState, keysToSave)
    return savedAuthState
  }
}
