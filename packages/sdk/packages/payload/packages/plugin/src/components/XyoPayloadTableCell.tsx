import { TableCell, TableCellProps, Typography } from '@mui/material'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

// DEFAULT IF DONT KNOW WHAT TO RENDER
export const XyoPayloadTableCell: React.FC<XyoPayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography>{payload?.schema}</Typography>
    </TableCell>
  )
}
