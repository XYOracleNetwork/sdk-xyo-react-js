import { Alert, Typography } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { XyoApiThrownErrorBoundary } from '../../../../auth-service'
import { BlockTableRow, BlockTableRowProps } from './TableRow'

interface TableRowWithErrorBoundaryProps extends BlockTableRowProps {
  index: number
  exploreDomain?: string
  onRowClick?: (value: XyoBoundWitness) => void
}

const BlockTableRowWithErrorBoundary: React.FC<TableRowWithErrorBoundaryProps> = ({ block, columns, onRowClick, index, exploreDomain }) => {
  return (
    <>
      {block ? (
        <XyoApiThrownErrorBoundary
          key={`${block._hash}-${block._timestamp}-${index}`}
          errorComponent={(e: Error) => (
            <Alert severity="error">
              Error Loading Block Details: <Typography fontWeight="bold">{e.message}</Typography>
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
        </XyoApiThrownErrorBoundary>
      ) : null}
    </>
  )
}

export { BlockTableRowWithErrorBoundary }
