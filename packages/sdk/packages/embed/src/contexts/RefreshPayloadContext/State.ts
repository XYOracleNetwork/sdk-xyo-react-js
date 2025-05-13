import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type RefreshPayloadState = ContextExState<{
  onRefresh?: () => void
  refreshPayload?: boolean
  setRefreshPayload?: Dispatch<SetStateAction<boolean | undefined>>
}>
