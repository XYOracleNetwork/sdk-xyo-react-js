import { styled, TableHead, TableRow, Typography } from '@mui/material'
import { PayloadTableHeadProps } from '@xyo-network/react-payload-table'
import { TableCellEx } from '@xyo-network/react-table'
import React from 'react'

export const BoundWitnessPayloadTableHead: React.FC<PayloadTableHeadProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const TableCellTypography = styled(Typography, { name: 'TableCellTypography' })(() => ({
  fontWeight: 'bold',
}))
