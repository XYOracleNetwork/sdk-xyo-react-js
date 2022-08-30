import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface RefreshPayloadState extends ContextExState {
  onRefresh?: () => void
  refreshPayload?: boolean
  setRefreshPayload?: Dispatch<SetStateAction<boolean | undefined>>
}
