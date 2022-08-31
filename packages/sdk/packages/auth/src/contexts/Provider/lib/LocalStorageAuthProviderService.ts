import { AuthState } from '../../State'

export type SaveableAuthStateProps = Extract<keyof AuthState, 'jwtToken' | 'loggedInAccount' | 'issuer'>

const LOCAL_STORAGE_NAME = 'AuthState'

export class localStorageAuthProviderService {
  public static loadAuthStateFromLocalStorage = () => {
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

  public static saveAuthStateToLocalStorage = (state: AuthState, keysToSave: SaveableAuthStateProps[]) => {
    const saveableValues = keysToSave.reduce((previous, key) => {
      previous[key] = state[key] ?? undefined
      return previous
    }, {} as AuthState)

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(saveableValues))
  }
}
