import { Alert, Typography } from '@mui/material'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { XyoThrownErrorBoundary } from '@xyo-network/react-error'
import { useHash } from '@xyo-network/react-shared'

import { BlockTableRow, BlockTableRowProps } from './TableRow'

interface TableRowWithErrorBoundaryProps extends BlockTableRowProps {
  archive?: string
  exploreDomain?: string
  index: number
  onRowClick?: (value: BoundWitness) => void
}

const BlockTableRowWithErrorBoundary: React.FC<TableRowWithErrorBoundaryProps> = ({ block, archive, columns, onRowClick, index, exploreDomain }) => {
  const hash = useHash(block)
  return (
    <>
      {block ? (
        <XyoThrownErrorBoundary
          boundaryName="BlockTableRow"
          key={`${hash}-${index}`}
          errorComponent={(e) => (
            <Alert severity="error">
              Error Loading Block: <Typography fontWeight="bold">{e.message}</Typography>
            </Alert>
          )}
        >
          <BlockTableRow
            archive={archive}
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
        </XyoThrownErrorBoundary>
      ) : null}
    </>
  )
}

export { BlockTableRowWithErrorBoundary }
