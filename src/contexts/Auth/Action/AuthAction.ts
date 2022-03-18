import { AuthState } from '../State'
import { AuthActionType } from './AuthActionType'

export interface AuthAction {
  type: AuthActionType
  payload: Partial<AuthState>
}
