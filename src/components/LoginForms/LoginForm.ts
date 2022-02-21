import { AuthDispatch } from '../../contexts'

export interface LoginForm {
  dispatch: AuthDispatch
  loggedInAccount: string | undefined
}
