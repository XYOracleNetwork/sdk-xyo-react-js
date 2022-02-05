import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { PayloadTableRow } from './PayloadTableRow'

export interface PayloadTableProps extends TableProps {
  payloads?: XyoPayload[] | null
}

export const PayloadTable: React.FC<PayloadTableProps> = ({ payloads, ...props }) => {
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="caption">Hash</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Archive</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Schema</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Date</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Time</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Valid</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payloads?.map((payload) => (
          <PayloadTableRow key={payload._hash} payload={payload} />
        ))}
      </TableBody>
    </Table>
  )
}
