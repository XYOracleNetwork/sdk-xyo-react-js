import { AuthActionType } from '../ActionType'
import { AuthState } from './State'

export interface AuthAction {
  payload: Partial<AuthState>
  type: AuthActionType
}
