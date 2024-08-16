import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch } from 'react'

export interface MapboxAccessTokenContextState extends ContextExState {
  accessToken?: string
  setAccessToken?: Dispatch<string>
}
