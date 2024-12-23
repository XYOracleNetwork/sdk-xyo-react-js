import type { TableCellProps } from '@mui/material'

export interface TableHeadCell {
  align?: 'left' | 'right' | 'center'
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
  showOnMobile: boolean
  width?: TableCellProps['width']
}
