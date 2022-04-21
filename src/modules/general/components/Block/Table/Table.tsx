import { Alert, Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { XyoApiThrownErrorBoundary } from '../../../../auth-service'
import { blockColumnNames, BlockTableColumnConfig, blockTableColumnConfigDefaults } from './BlockTableColumnConfig'
import { BlockTableRow } from './TableRow'

export interface BlockTableProps extends TableProps {
  blocks?: XyoBoundWitness[] | null
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}

export const BlockTable: React.FC<BlockTableProps> = ({ exploreDomain, onRowClick, blocks, columns = blockTableColumnConfigDefaults(), children, ...props }) => {
  const breakPoint = useBreakpoint()
  return breakPoint ? (
    <Table style={{ overflow: 'hidden' }} {...props}>
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
            return (
              <TableCell key={index} width={index > 0 ? '10px' : undefined} align={index === 0 ? 'left' : 'center'}>
                <Typography variant="caption" noWrap>
                  <strong>{blockColumnNames[column]}</strong>
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {blocks?.map((block, index) => (
          <XyoApiThrownErrorBoundary
            key={`${block._hash}-${block._timestamp}-${index}`}
            errorComponent={<Alert severity="error">Error Loading Block Details: {JSON.stringify(block)}</Alert>}
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
        ))}
        {children}
      </TableBody>
    </Table>
  ) : null
}
