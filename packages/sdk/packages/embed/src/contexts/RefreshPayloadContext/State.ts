import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface RefreshPayloadState extends ContextExState {
  onRefresh?: () => void
  refreshPayload?: boolean
  setRefreshPayload?: Dispatch<SetStateAction<boolean | undefined>>
}
