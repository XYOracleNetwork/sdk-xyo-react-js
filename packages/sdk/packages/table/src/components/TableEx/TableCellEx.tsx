import type { TableCellProps } from '@mui/material'
import { styled, TableCell } from '@mui/material'

export interface TableCellExProps extends TableCellProps {
  noBgColor?: boolean
}

export const TableCellEx = styled(TableCell, {
  name: 'TableCellNoBgColor', shouldForwardProp: prop => prop !== 'noBgColor',
})<TableCellExProps>(
  ({ noBgColor = true }) => ({
    ...(noBgColor && { backgroundColor: 'transparent' }),
  }),
)
