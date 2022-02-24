import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { ScrollTableOnSm } from '../../ScrollTableOnSm'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableProps {
  exploreDomain?: string
  validate?: boolean
  onRowClick?: (value: XyoPayload) => void
  payloads?: XyoPayload[] | null
  showClient?: boolean
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  onRowClick,
  validate = false,
  showClient = false,
  payloads,
  children,
  ...props
}) => {
  return (
    <ScrollTableOnSm>
      <Table {...props}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="caption">Hash</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">Archive</Typography>
            </TableCell>
            {showClient ? (
              <TableCell align="center">
                <Typography variant="caption">Client</Typography>
              </TableCell>
            ) : null}
            <TableCell align="center">
              <Typography variant="caption">Schema</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">Date</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="caption">Time</Typography>
            </TableCell>
            {validate && (
              <TableCell align="center">
                <Typography variant="caption">Valid</Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {payloads?.map((payload) => (
            <PayloadTableRow
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(payload)
                    }
                  : undefined
              }
              showClient={showClient}
              exploreDomain={exploreDomain}
              validate={validate}
              key={payload._hash}
              payload={payload}
            />
          ))}
          {children}
        </TableBody>
      </Table>
    </ScrollTableOnSm>
  )
}
