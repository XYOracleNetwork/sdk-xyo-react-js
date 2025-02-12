import type { ContextExState } from '@xylabs/react-shared'
import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import type { RefObject } from 'react'

export interface UIState {
  loading?: boolean
  /** DOM Ref that has an event listener for page change events and update scroll position */
  scrollRef?: RefObject<HTMLTableElement>
  scrollToTop?: number
  updateLoading?: (loading: boolean) => void
}

export interface TotalPayloadsState {
  cursor?: Sequence
  fetchMorePayloads?: () => void
  totalPayloads?: Payload[]
  totalPayloadsCount?: number
  updateCursor?: (sequence: Sequence) => void
  updateTotalPayloads?: (additionalPayloads?: WithStorageMeta<Payload>[]) => boolean
}

export interface PayloadListState extends ContextExState {
  errors?: (Error | undefined)[]
  resetList?: () => void
  totalPayloadsState?: TotalPayloadsState
  uiState?: UIState
}
