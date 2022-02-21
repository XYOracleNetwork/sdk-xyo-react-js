import { AuthDispatch, AuthState, IAuthService } from '../../contexts'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount: string | undefined
  authServiceList: IAuthService[]
}
