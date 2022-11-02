import { TableCell, TableRow, TableRowProps, Typography, TypographyProps } from '@mui/material'

export interface TableRowNoDataProps extends TableRowProps {
  typographyProps?: TypographyProps
}

export const TableRowNoData: React.FC<TableRowNoDataProps> = ({ typographyProps, ...props }) => {
  return (
    <TableRow {...props}>
      <TableCell sx={{ border: 'none' }}>
        <Typography variant="body2" {...typographyProps}>
          No Data To Display...
        </Typography>
      </TableCell>
    </TableRow>
  )
}
