import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type TableHeightState = ContextExState<{
  height?: string
  rowHeight?: number
  setRowHeight?: Dispatch<SetStateAction<number | undefined>>
  setVisibleRows?: Dispatch<SetStateAction<number | undefined>>
  visibleRows?: number
}>
