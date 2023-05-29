import { Alert, TableBody, Typography } from '@mui/material'
import { XyoThrownErrorBoundary } from '@xyo-network/react-error'
import { useHashes } from '@xyo-network/react-shared'

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
  const payloadPairs = useHashes(payloads)

  return (
    <TableBody {...props}>
      {noResults && NoResultRowComponent ? <NoResultRowComponent /> : null}
      {payloadPairs?.map(([payload, hash], index) => {
        return (
          <XyoThrownErrorBoundary
            boundaryName="PayloadTableBody"
            key={`${hash}-${index}`}
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
