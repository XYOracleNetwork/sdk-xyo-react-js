import { AuthDispatch, AuthService, AuthState } from '../../contexts'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount: string | undefined
  authServiceList?: AuthService[]
}
