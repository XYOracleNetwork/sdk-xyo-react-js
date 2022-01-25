import { AuthServices } from './AuthServices'
import { AuthServiceId, AuthState } from './AuthStateTypes'

export const DefaultState: AuthState = {
  activeAuthServiceId: AuthServiceId.None,
  authError: undefined,
  authServiceList: AuthServices,
  isLoading: false,
  isLoggedIn: false,
}
