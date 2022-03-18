import { AxiosError } from 'axios'

export enum AuthServiceId {
  EmailPassword = 'EmailPassword',
  Web3Wallet = 'Web3Wallet',
  None = 'None',
}

export interface AuthService {
  id: AuthServiceId
  title: string
}

/** @deprecated use AuthService instead */
export type IAuthService = AuthService

export interface AuthState {
  apiDomain: string
  activeAuthServiceId: AuthServiceId
  readonly authServiceList: AuthService[]
  isLoading: boolean
  /** @deprecated use loggedInAccount instead */
  isLoggedIn?: boolean
  authError: undefined | Error | AxiosError
  jwtToken?: string
  loggedInAccount?: string
  reAuthenticate?: boolean
}

export enum AuthActionTypes {
  UpdateActiveAuthService = 'UpdateActiveAuthService',
  RehydrateState = 'RehydrateState',
  Logout = 'Logout',
  AuthSuccessful = 'AuthSuccessful',
  AuthFailure = 'AuthFailure',
}

export interface AuthAction {
  type: AuthActionTypes
  payload: Partial<AuthState>
}

export type AuthDispatch = (action: AuthAction) => void
export interface AuthContextType {
  state?: AuthState
  dispatch?: AuthDispatch
}

export interface AuthServiceComponentProps {
  authState?: AuthState
}
