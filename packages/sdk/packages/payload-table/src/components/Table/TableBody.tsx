import { Alert, TableBody, Typography } from '@mui/material'
import { PayloadWrapper } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'

import { PayloadTableRow } from './TableRow'
import { PayloadTableBodyProps } from './types'

export const PayloadTableBody: React.FC<PayloadTableBodyProps> = ({
  children,
  exploreDomain,
  payloads,
  archive,
  maxSchemaDepth,
  onRowClick,
  emptyRows,
  ...props
}) => {
  return (
    <TableBody {...props}>
      {payloads?.map((payload, index) => {
        const wrapper = new PayloadWrapper(payload)
        return (
          <XyoApiThrownErrorBoundary
            key={`${wrapper.hash}-${index}`}
            errorComponent={(e: Error) => (
              <Alert severity="error">
                Error Loading Payload: <Typography fontWeight="bold">{e.message}</Typography>
              </Alert>
            )}
          >
            <PayloadTableRow
              maxSchemaDepth={maxSchemaDepth}
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
      {(emptyRows ?? 0) > 0 && Array(emptyRows).fill(<PayloadTableRow />)}
    </TableBody>
  )
}
