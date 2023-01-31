import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface TableHeightState extends ContextExState {
  height?: string
  rowHeight?: number
  setRowHeight?: Dispatch<SetStateAction<number | undefined>>
  setVisibleRows?: Dispatch<SetStateAction<number | undefined>>
  visibleRows?: number
}
