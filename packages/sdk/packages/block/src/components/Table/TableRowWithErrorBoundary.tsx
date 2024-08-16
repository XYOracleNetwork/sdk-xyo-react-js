import { Alert, Typography } from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { ThrownErrorBoundary } from '@xyo-network/react-error'
import { usePayloadHash } from '@xyo-network/react-shared'
import React from 'react'

import type { BlockTableRowProps } from './TableRow.tsx'
import { BlockTableRow } from './TableRow.tsx'

interface TableRowWithErrorBoundaryProps extends BlockTableRowProps {
  exploreDomain?: string
  index: number
  onRowClick?: (value: BoundWitness) => void
}

const BlockTableRowWithErrorBoundary: React.FC<TableRowWithErrorBoundaryProps> = ({ block, columns, onRowClick, index, exploreDomain }) => {
  const hash = usePayloadHash(block)
  return (
    <>
      {block
        ? (
            <ThrownErrorBoundary
              boundaryName="BlockTableRow"
              key={`${hash}-${index}`}
              errorComponent={e => (
                <Alert severity="error">
                  Error Loading Block:
                  {' '}
                  <Typography fontWeight="bold">{e.message}</Typography>
                </Alert>
              )}
            >
              <BlockTableRow
                exploreDomain={exploreDomain}
                block={block}
                columns={columns}
                onClick={
                  onRowClick
                    ? () => {
                        onRowClick(block)
                      }
                    : undefined
                }
              />
            </ThrownErrorBoundary>
          )
        : null}
    </>
  )
}

export { BlockTableRowWithErrorBoundary }
