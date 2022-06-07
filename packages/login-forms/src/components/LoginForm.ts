import { AuthDispatch, AuthServiceId, AuthState } from '@xyo-network/react-auth'
import { Dispatch, SetStateAction } from 'react'

export interface LoginForm extends Partial<AuthState> {
  dispatch: AuthDispatch
  loggedInAccount?: string | null
  activeAuthServiceId?: AuthServiceId
  setActiveAuthServiceId?: Dispatch<SetStateAction<AuthServiceId>>
}
