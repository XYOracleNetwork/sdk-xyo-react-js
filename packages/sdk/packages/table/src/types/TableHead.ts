import { CSSProperties } from 'react'

export interface TableHeadCell {
  align?: 'left' | 'right' | 'center'
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
  showOnMobile: boolean
  width?: CSSProperties['width']
}
