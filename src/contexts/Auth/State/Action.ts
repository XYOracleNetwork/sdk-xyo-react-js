import { AuthActionType } from '../ActionType'
import { AuthState } from './State'

export interface AuthAction {
  type: AuthActionType
  payload: Partial<AuthState>
}
