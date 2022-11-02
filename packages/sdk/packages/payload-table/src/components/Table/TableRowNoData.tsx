import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'

export const TableRowNoData: React.FC<TableRowProps> = (props) => {
  return (
    <TableRow {...props}>
      <TableCell sx={{ border: 'none' }}>
        <Typography variant="body2">No Data To Display...</Typography>
      </TableCell>
    </TableRow>
  )
}
