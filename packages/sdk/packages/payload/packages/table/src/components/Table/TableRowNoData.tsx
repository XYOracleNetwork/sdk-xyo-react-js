import type { TableRowProps, TypographyProps } from '@mui/material'
import {
  styled, TableCell, TableRow, Typography,
} from '@mui/material'
import React from 'react'

export interface TableRowNoDataProps extends TableRowProps {
  additionalCells?: number
  hideBorder?: boolean
  typographyProps?: TypographyProps
}

export const TableRowNoData: React.FC<TableRowNoDataProps> = ({
  additionalCells, hideBorder = false, typographyProps, ...props
}) => {
  return (
    <TableRow {...props}>
      <StyledTableCell hideBorder={hideBorder}>
        <Typography variant="body2" {...typographyProps}>
          No Data To Display...
        </Typography>
      </StyledTableCell>
      {additionalCells
        ? Array.from({ length: additionalCells })
            .fill(null)
            .map((_fill, index) => <StyledTableCell key={index} hideBorder={hideBorder} />)
        : null}
    </TableRow>
  )
}

interface StyledTableCellProps {
  hideBorder?: boolean
}

const StyledTableCell = styled(TableCell, {
  name: 'StyledTableCell',
  shouldForwardProp: (prop: string) => prop !== 'hideBorder',
})<StyledTableCellProps>(({ hideBorder }) => ({ ...(hideBorder && { border: 'none' }) }))
