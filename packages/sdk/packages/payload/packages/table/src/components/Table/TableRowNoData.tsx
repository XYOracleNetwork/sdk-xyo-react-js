import { styled, TableCell, TableRow, TableRowProps, Typography, TypographyProps } from '@mui/material'

export interface TableRowNoDataProps extends TableRowProps {
  typographyProps?: TypographyProps
  hideBorder?: boolean
}

export const TableRowNoData: React.FC<TableRowNoDataProps> = ({ hideBorder = false, typographyProps, ...props }) => {
  return (
    <TableRow {...props}>
      <StyledTableCell hideBorder={hideBorder}>
        <Typography variant="body2" {...typographyProps}>
          No Data To Display...
        </Typography>
      </StyledTableCell>
    </TableRow>
  )
}

interface StyledTableCellProps {
  hideBorder?: boolean
}

const StyledTableCell = styled(TableCell, { name: 'StyledTableCell' })<StyledTableCellProps>(({ hideBorder }) => ({
  ...(hideBorder && { border: 'none' }),
}))
