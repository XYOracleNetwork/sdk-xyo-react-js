import {
  Alert, TableBody, Typography,
} from '@mui/material'
import { ThrownErrorBoundary } from '@xylabs/react-error'
import { usePayloadHashes } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React from 'react'

import { PayloadTableRow } from './TableRow.tsx'
import type { PayloadTableBodyProps } from './types/index.ts'

export const PayloadTableBody: React.FC<PayloadTableBodyProps> = ({
  children,
  clickableFields,
  payloads,
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
              clickableFields={clickableFields}
              maxSchemaDepth={maxSchemaDepth}
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(payload)
                    }
                  : undefined
              }
              onHashClick={onHashClick}
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
