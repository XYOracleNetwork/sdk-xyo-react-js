import { Alert, Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'

import { PayloadDynamicTableRow } from './DynamicTableRow'
import { payloadColumnNames, PayloadDynamicTableColumnConfig, payloadDynamicTableColumnConfigDefaults } from './PayloadDynamicTableColumnConfig'

export interface PayloadDynamicTableProps extends TableProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  payloads?: XyoPayload[] | null
  columns?: PayloadDynamicTableColumnConfig
}

export const PayloadDynamicTable: React.FC<PayloadDynamicTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  payloads,
  children,
  columns = payloadDynamicTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  return breakPoint ? (
    <Table {...props}>
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
            return (
              <TableCell key={index} width={undefined} align="left">
                <Typography variant="caption" noWrap>
                  <strong>{payloadColumnNames[column]}</strong>
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {payloads?.map((payload, index) => {
          const wrapper = new XyoPayloadWrapper(payload)
          return (
            <XyoApiThrownErrorBoundary
              key={`${wrapper.hash}-${index}`}
              errorComponent={(e) => (
                <Alert severity="error">
                  Error Loading Payload: <Typography fontWeight="bold">{e.message}</Typography>
                </Alert>
              )}
            >
              <PayloadDynamicTableRow
                archive={archive}
                onClick={
                  onRowClick
                    ? () => {
                        onRowClick(payload)
                      }
                    : undefined
                }
                exploreDomain={exploreDomain}
                payload={payload}
              />
            </XyoApiThrownErrorBoundary>
          )
        })}
        {children}
      </TableBody>
    </Table>
  ) : null
}
