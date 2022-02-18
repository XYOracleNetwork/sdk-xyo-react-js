import { AxiosError } from 'axios'

enum AuthServiceId {
  EmailPassword = 'EmailPassword',
  Web3Wallet = 'Web3Wallet',
  None = 'None',
}

export interface AuthState {
  apiDomain: string
  activeAuthServiceId: AuthServiceId
  readonly authServiceList: IAuthService[]
  isLoading: boolean
  isLoggedIn: boolean
  authError: undefined | Error | AxiosError
  jwtToken?: string
  loggedInAccount?: string
  reAuthenticate?: boolean
}

export enum AuthActionTypes {
  UpdateActiveAuthService = 'UpdateActiveAuthService',
  UpdateLoadingState = 'UpdateLoadingState',
  RehydrateState = 'RehydrateState',
  UpdateAuthError = 'UpdateAuthError',
  Logout = 'Logout',
  AuthSuccessful = 'AuthSuccessful',
  AuthFailure = 'AuthFailure',
  UpdateReAuthenticate = 'UpdateReAuthenticate',
}

export interface AuthAction {
  type: AuthActionTypes
  payload: Partial<AuthState>
}

export type AuthDispatch = (action: AuthAction) => void
export type AuthContextType = { state: AuthState; dispatch: AuthDispatch } | undefined

export interface AuthServiceComponentProps {
  authState?: AuthState
}

export interface IAuthService {
  id: AuthServiceId
  title: string
}

export { AuthServiceId }
