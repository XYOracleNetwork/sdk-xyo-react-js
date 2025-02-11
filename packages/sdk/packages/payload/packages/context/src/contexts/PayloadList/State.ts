import type { ContextExState } from '@xylabs/react-shared'
import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import type { RefObject } from 'react'

export type PayloadListState = ContextExState & {
  cursor?: Sequence
  errors?: (Error | undefined)[]
  fetchMorePayloads?: () => void
  loading?: boolean
  resetList?: () => void
  /** DOM Ref that has an event listener for page change events and update scroll position */
  scrollRef?: RefObject<HTMLTableElement>
  scrollToTop?: number
  totalPayloads?: Payload[]
  totalPayloadsCount?: number
  updateCursor?: (sequence: Sequence) => void
  updateLoading?: (loading: boolean) => void
  updateTotalPayloads?: (additionalPayloads?: WithStorageMeta<Payload>[]) => boolean
}
