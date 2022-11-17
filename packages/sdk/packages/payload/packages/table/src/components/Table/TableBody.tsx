import { Alert, TableBody, Typography } from '@mui/material'
import { PayloadWrapper } from '@xyo-network/payload'
import { XyoThrownErrorBoundary } from '@xyo-network/react-error'

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
  noResults,
  NoResultRowComponent,
  ...props
}) => {
  return (
    <TableBody {...props}>
      {noResults && NoResultRowComponent ? <NoResultRowComponent /> : null}
      {payloads?.map((payload, index) => {
        const wrapper = new PayloadWrapper(payload)
        return (
          <XyoThrownErrorBoundary
            boundaryName="PayloadTableBody"
            key={`${wrapper.hash}-${index}`}
            errorComponent={(e) => (
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
          </XyoThrownErrorBoundary>
        )
      })}
      {children}
      {(emptyRows ?? 0) > 0 && Array(emptyRows).fill(<PayloadTableRow />)}
    </TableBody>
  )
}
