import { Alert, Typography } from '@mui/material'
import { BoundWitnessWrapper, XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'

import { BlockTableRow, BlockTableRowProps } from './TableRow'

interface TableRowWithErrorBoundaryProps extends BlockTableRowProps {
  index: number
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoBoundWitness) => void
}

const BlockTableRowWithErrorBoundary: React.FC<TableRowWithErrorBoundaryProps> = ({ block, archive, columns, onRowClick, index, exploreDomain }) => {
  const wrapper = block ? new BoundWitnessWrapper(block) : undefined
  return (
    <>
      {block ? (
        <XyoApiThrownErrorBoundary
          key={`${wrapper?.hash}-${index}`}
          errorComponent={(e: Error) => (
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
        </XyoApiThrownErrorBoundary>
      ) : null}
    </>
  )
}

export { BlockTableRowWithErrorBoundary }
