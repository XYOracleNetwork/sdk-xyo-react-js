import { AuthDispatch, AuthService, AuthState } from '../../auth'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount: string | undefined
  authServiceList?: AuthService[]
}
