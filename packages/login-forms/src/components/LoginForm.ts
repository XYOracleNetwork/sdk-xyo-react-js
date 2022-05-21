import { AuthDispatch, AuthService, AuthState } from '@xyo-network/react-auth'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount?: string | null
  authServiceList?: AuthService[]
}
