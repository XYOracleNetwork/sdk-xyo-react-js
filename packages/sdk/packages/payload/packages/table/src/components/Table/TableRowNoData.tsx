import { styled, TableCell, TableRow, TableRowProps, Typography, TypographyProps } from '@mui/material'

export interface TableRowNoDataProps extends TableRowProps {
  typographyProps?: TypographyProps
  hideBorder?: boolean
  additionalCells?: number
}

export const TableRowNoData: React.FC<TableRowNoDataProps> = ({ hideBorder = false, typographyProps, additionalCells, ...props }) => {
  return (
    <TableRow {...props}>
      <StyledTableCell hideBorder={hideBorder}>
        <Typography variant="body2" {...typographyProps}>
          No Data To Display...
        </Typography>
      </StyledTableCell>
      {additionalCells
        ? Array(additionalCells)
            .fill(undefined)
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
})<StyledTableCellProps>(({ hideBorder }) => ({
  ...(hideBorder && { border: 'none' }),
}))
