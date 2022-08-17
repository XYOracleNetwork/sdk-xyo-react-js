import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface RefreshPayloadState extends ContextExState {
  onRefresh?: () => void
  refreshingPayload?: boolean
  setRefreshingPayload?: Dispatch<SetStateAction<boolean | undefined>>
}
