import { AuthDispatch } from './Dispatch'
import { AuthState } from './State'

export interface AuthContextProps {
  dispatch?: AuthDispatch
  state?: AuthState
}

/** @deprecated */
export type AuthContextType = AuthContextProps
