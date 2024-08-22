import type { TableCellProps } from '@mui/material'
import { TableCell, Typography } from '@mui/material'
import React from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

// DEFAULT IF DONT KNOW WHAT TO RENDER
export const PayloadTableCell: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography>{payload?.schema}</Typography>
    </TableCell>
  )
}
