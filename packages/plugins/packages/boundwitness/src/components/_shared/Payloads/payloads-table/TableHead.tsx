import { styled, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { PayloadTableHeadProps } from '@xyo-network/react-payload-table'

export const BoundWitnessPayloadTableHead: React.FC<PayloadTableHeadProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, ...tableHeadProps } = props
  return (
    <TableHead {...tableHeadProps}>
      <TableRow>
        <TableCell>
          <TableCellTypography variant="caption">Schema</TableCellTypography>
        </TableCell>
        <TableCell>
          <TableCellTypography variant="caption">Hash</TableCellTypography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

const TableCellTypography = styled(Typography, { name: 'TableCellTypography' })(() => ({
  fontWeight: 'bold',
}))
