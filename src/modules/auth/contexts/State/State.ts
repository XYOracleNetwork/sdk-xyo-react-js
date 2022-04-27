import { XyoApiError } from '@xyo-network/sdk-xyo-client-js'

import { AuthService, AuthServiceId } from './Service'

export interface AuthState {
  /** @deprecated now controlled by archivist api instead */
  apiDomain: string
  activeAuthServiceId: AuthServiceId
  readonly authServiceList: AuthService[]
  isLoading: boolean
  /** @deprecated use loggedInAccount instead */
  isLoggedIn?: boolean
  authError: undefined | Error | XyoApiError
  jwtToken?: string
  loggedInAccount?: string
  reAuthenticate?: boolean
}
