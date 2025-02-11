import type { ContextExState } from '@xylabs/react-shared'
import type {
  Payload, Sequence, WithStorageMeta,
} from '@xyo-network/payload-model'
import type {
  Dispatch, RefObject, SetStateAction,
} from 'react'

export type PayloadListState = ContextExState & {
  cursor?: Sequence
  errors?: (Error | undefined)[]
  fetchMorePayloads?: () => void
  loading?: boolean
  resetList?: () => void
  /** DOM Ref that has an event listener for page change events and update scroll position */
  scrollRef?: RefObject<HTMLTableElement>
  scrollToTop?: number
  setCursor?: Dispatch<SetStateAction<Sequence | undefined>>
  setLoading?: Dispatch<SetStateAction<boolean>>
  totalPayloads?: Payload[]
  totalPayloadsCount?: number
  updateTotalPayloads?: (additionalPayloads?: WithStorageMeta<Payload>[]) => boolean
}
