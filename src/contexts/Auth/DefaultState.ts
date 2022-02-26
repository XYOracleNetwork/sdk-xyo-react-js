import { AuthServiceId, AuthState } from './AuthStateTypes'

export const DefaultState: AuthState = {
  activeAuthServiceId: AuthServiceId.None,
  apiDomain: 'http://localhost:8081',
  authError: undefined,
  authServiceList: [],
  isLoading: false,
  jwtToken: '',
  loggedInAccount: '',
  reAuthenticate: false,
}
