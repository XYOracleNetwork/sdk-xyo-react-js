import { AuthServiceId, AuthState } from './AuthStateTypes'

export const DefaultState: AuthState = {
  activeAuthServiceId: AuthServiceId.None,
  authError: undefined,
  authServiceList: [],
  isLoading: false,
  isLoggedIn: false,
}
