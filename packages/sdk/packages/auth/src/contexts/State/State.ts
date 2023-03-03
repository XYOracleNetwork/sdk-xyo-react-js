import { AuthActionType } from '../ActionType'
import { AuthService, AuthServiceId } from './Service'

export interface AuthState {
  /** @deprecated now controlled by AuthServiceContext instead */
  activeAuthServiceId?: AuthServiceId
  /** @deprecated now controlled by archivist api instead */
  apiDomain: string
  authError: undefined | Error
  /** @deprecated now controlled by AuthServiceContext instead */
  readonly authServiceList?: AuthService[]
  isLoading: boolean
  /** @deprecated use loggedInAccount instead */
  isLoggedIn?: boolean
  /** url responsible for issuing the current jwtToken */
  issuer?: string
  jwtToken?: string
  lastAction?: AuthActionType
  loggedInAccount?: string | null
  reAuthenticate?: boolean
}
