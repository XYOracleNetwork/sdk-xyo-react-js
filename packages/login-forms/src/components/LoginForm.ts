import { AuthDispatch, AuthState } from '@xyo-network/react-auth'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount?: string | null
  onSuccess?: () => void
}
