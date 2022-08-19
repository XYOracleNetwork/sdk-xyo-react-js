import { TableCell, TableCellProps } from '@mui/material'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadTableCell: React.FC<XyoPayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  return <TableCell {...props}>{payload?.schema}</TableCell>
}

// DEFAULT IF DONT KNOW WHAT TO RENDER
