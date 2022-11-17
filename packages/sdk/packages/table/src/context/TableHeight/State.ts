import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface TableHeightState extends ContextExState {
  visibleRows?: number
  setVisibleRows?: Dispatch<SetStateAction<number | undefined>>
  height?: string
  rowHeight?: number
  setRowHeight?: Dispatch<SetStateAction<number | undefined>>
}
