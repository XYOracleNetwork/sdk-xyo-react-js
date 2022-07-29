import { Dispatch, SetStateAction } from 'react'

import { AuthService, AuthServiceId } from '../State'

export interface AuthServiceState {
  readonly authServiceList?: AuthService[]
  activeAuthServiceId?: AuthServiceId
  setActiveAuthServiceId?: Dispatch<SetStateAction<AuthServiceId>>
}
