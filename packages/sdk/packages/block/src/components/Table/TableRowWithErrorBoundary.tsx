import { Alert, Typography } from '@mui/material'
import { ThrownErrorBoundary } from '@xylabs/react-error'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import React from 'react'

import type { BlockTableColumnSlug } from './BlockTableColumnConfig.ts'
import type { BlockTableRowProps } from './TableRow.tsx'
import { BlockTableRow } from './TableRow.tsx'

interface TableRowWithErrorBoundaryProps extends BlockTableRowProps {
  clickableFields?: BlockTableColumnSlug[]
  /** @deprecated - use events to build links instead of passing props */
  exploreDomain?: string
  index: number
  onRowClick?: (value: BoundWitness) => void
}

const BlockTableRowWithErrorBoundary: React.FC<TableRowWithErrorBoundaryProps> = ({
  block, clickableFields, columns, onRowClick, index,
}) => {
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
                block={block}
                clickableFields={clickableFields}
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
