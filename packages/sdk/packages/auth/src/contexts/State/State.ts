import { XyoApiError } from '@xyo-network/api-models'

import { AuthActionType } from '../ActionType'
import { AuthService, AuthServiceId } from './Service'

export interface AuthState {
  /** @deprecated now controlled by archivist api instead */
  apiDomain: string
  /** @deprecated now controlled by AuthServiceContext instead */
  activeAuthServiceId?: AuthServiceId
  /** @deprecated now controlled by AuthServiceContext instead */
  readonly authServiceList?: AuthService[]
  isLoading: boolean
  /** @deprecated use loggedInAccount instead */
  isLoggedIn?: boolean
  authError: undefined | Error | XyoApiError
  jwtToken?: string
  loggedInAccount?: string | null
  reAuthenticate?: boolean
  /** url responsible for issuing the current jwtToken */
  issuer?: string
  lastAction?: AuthActionType
}
