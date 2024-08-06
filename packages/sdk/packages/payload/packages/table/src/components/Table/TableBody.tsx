import { Alert, TableBody, Typography } from '@mui/material'
import { ThrownErrorBoundary } from '@xyo-network/react-error'
import { usePayloadHashes } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { PayloadTableRow } from './TableRow.js'
import { PayloadTableBodyProps } from './types/index.js'

export const PayloadTableBody: React.FC<PayloadTableBodyProps> = ({
  children,
  exploreDomain,
  payloads,
  archive,
  maxSchemaDepth,
  onHashClick,
  onRowClick,
  emptyRows,
  noResults,
  NoResultRowComponent,
  ...props
}) => {
  const payloadPairs = usePayloadHashes(payloads)

  return (
    <TableBody {...props}>
      {noResults && NoResultRowComponent
        ? <NoResultRowComponent />
        : null}
      {payloadPairs?.map(([payload, hash], index) => {
        return (
          <ThrownErrorBoundary
            boundaryName="PayloadTableBody"
            key={`${hash}-${index}`}
            errorComponent={e => (
              <Alert severity="error">
                Error Loading Payload:
                {' '}
                <Typography fontWeight="bold">{e.message}</Typography>
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
              onHashClick={onHashClick}
              exploreDomain={exploreDomain}
              payload={payload}
            />
          </ThrownErrorBoundary>
        )
      })}
      {children}
      {emptyRows ? (Array.from({ length: emptyRows }).fill(<PayloadTableRow />) as ReactNode[]) : null}
    </TableBody>
  )
}
