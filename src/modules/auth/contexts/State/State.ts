import { AxiosError } from 'axios'

import { AuthService, AuthServiceId } from './Service'

export interface AuthState {
  /** @deprecated now controlled by archivist api instead */
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
