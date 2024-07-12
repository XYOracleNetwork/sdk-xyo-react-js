import { TableCell, TableCellProps, Typography } from '@mui/material'

import { PayloadRenderProps } from '../PayloadRenderPlugin.js'

// DEFAULT IF DONT KNOW WHAT TO RENDER
export const PayloadTableCell: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography>{payload?.schema}</Typography>
    </TableCell>
  )
}
