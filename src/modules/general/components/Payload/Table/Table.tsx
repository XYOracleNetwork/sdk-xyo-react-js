import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { ScrollTableOnSm } from '../../ScrollTableOnSm'
import {
  payloadColumnNames,
  PayloadTableColumnConfig,
  payloadTableColumnConfigDefaults,
} from './PayloadTableColumnConfig'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableProps {
  exploreDomain?: string
  onRowClick?: (value: XyoPayload) => void
  payloads?: XyoPayload[] | null
  columns?: PayloadTableColumnConfig
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  onRowClick,
  payloads,
  children,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  return breakPoint ? (
    <ScrollTableOnSm>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {columns[breakPoint]?.map((column, index) => {
              return (
                <TableCell key={index} width={index > 0 ? '10px' : undefined} align={index === 0 ? 'left' : 'center'}>
                  <Typography variant="caption" noWrap>
                    <strong>{payloadColumnNames[column]}</strong>
                  </Typography>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {payloads?.map((payload, index) => (
            <PayloadTableRow
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(payload)
                    }
                  : undefined
              }
              exploreDomain={exploreDomain}
              key={`${payload._hash}-${payload._timestamp}-${index}`}
              payload={payload}
            />
          ))}
          {children}
        </TableBody>
      </Table>
    </ScrollTableOnSm>
  ) : null
}
