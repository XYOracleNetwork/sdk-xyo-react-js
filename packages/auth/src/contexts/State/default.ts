import { authServiceList } from '../../../../../.storybook'
import { AuthServiceId } from './Service'
import { AuthState } from './State'

export const defaultState = (): AuthState => {
  return {
    activeAuthServiceId: AuthServiceId.None,
    apiDomain: 'http://localhost:8081',
    authError: undefined,
    authServiceList: [...authServiceList],
    isLoading: false,
    jwtToken: '',
    loggedInAccount: '',
    reAuthenticate: false,
  }
}
