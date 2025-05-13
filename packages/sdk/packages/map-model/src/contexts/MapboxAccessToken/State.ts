import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch } from 'react'

export type MapboxAccessTokenContextState = ContextExState<{
  accessToken?: string
  setAccessToken?: Dispatch<string>
}>
