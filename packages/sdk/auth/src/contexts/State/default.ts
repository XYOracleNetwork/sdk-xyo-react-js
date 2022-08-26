import { AuthState } from './State'

export const defaultState = (): AuthState => {
  return {
    apiDomain: 'http://localhost:8081',
    authError: undefined,
    isLoading: false,
    jwtToken: '',
    loggedInAccount: '',
    reAuthenticate: false,
    tokenCheckComplete: false,
  }
}
