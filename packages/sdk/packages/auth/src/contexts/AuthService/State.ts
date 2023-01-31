import { Dispatch, SetStateAction } from 'react'

import { AuthService, AuthServiceId } from '../State'

export interface AuthServiceState {
  activeAuthServiceId?: AuthServiceId
  readonly authServiceList?: AuthService[]
  setActiveAuthServiceId?: Dispatch<SetStateAction<AuthServiceId>>
}
