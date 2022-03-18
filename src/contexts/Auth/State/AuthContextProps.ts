import { AuthDispatch } from '../Dispatch'
import { AuthState } from './State'

export interface AuthContextProps {
  state?: AuthState
  dispatch?: AuthDispatch
}

/** @deprecated */
export type AuthContextType = AuthContextProps
