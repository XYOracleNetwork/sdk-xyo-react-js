import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface MapboxAccessTokenContextState extends ContextExState {
  accessToken?: string
  setAccessToken?: Dispatch<string>
}
