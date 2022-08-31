import { AuthState } from './State'

export const defaultState = (): AuthState => {
  return {
    apiDomain: '',
    authError: undefined,
    isLoading: false,
    issuer: '',
    jwtToken: '',
    loggedInAccount: '',
    reAuthenticate: false,
  }
}
