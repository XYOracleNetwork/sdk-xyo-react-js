import {
  styled, TableHead, TableRow, Typography,
} from '@mui/material'
import type { PayloadTableHeadProps } from '@xyo-network/react-payload-table'
import { TableCellEx } from '@xyo-network/react-table'
import React from 'react'

export const BoundWitnessPayloadTableHead: React.FC<PayloadTableHeadProps> = (props) => {
  const { columns, ...tableHeadProps } = props
  return (
    <TableHead {...tableHeadProps}>
      <TableRow>
        <TableCellEx>
          <TableCellTypography variant="caption">Schema</TableCellTypography>
        </TableCellEx>
        <TableCellEx>
          <TableCellTypography variant="caption">Hash</TableCellTypography>
        </TableCellEx>
      </TableRow>
    </TableHead>
  )
}

const TableCellTypography = styled(Typography, { name: 'TableCellTypography' })(() => ({ fontWeight: 'bold' }))
