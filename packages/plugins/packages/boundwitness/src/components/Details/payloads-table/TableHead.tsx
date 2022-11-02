import { TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { PayloadTableHeadProps } from '@xyo-network/react-payload-table'

export const BoundWitnessPayloadTableHead: React.FC<PayloadTableHeadProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, ...tableHeadProps } = props
  return (
    <TableHead {...tableHeadProps}>
      <TableRow>
        <TableCell>
          <Typography variant="caption" fontWeight="bold">
            Schema
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption" fontWeight="bold">
            Hash
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
