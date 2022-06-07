import { AuthState } from './State'

export const defaultState = (): AuthState => {
  return {
    authError: undefined,
    isLoading: false,
    jwtToken: '',
    loggedInAccount: '',
    reAuthenticate: false,
  }
}
