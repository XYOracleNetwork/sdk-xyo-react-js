import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { Hasher } from '@xyo-network/core'
import { TableEx } from '@xyo-network/react-table'

import { blockColumnNames, blockTableColumnConfigDefaults } from './BlockTableColumnConfig'
import { BlockTableProps } from './BlockTableProps'
import { BlockTableRowWithErrorBoundary } from './TableRowWithErrorBoundary'

export const BlockTable: React.FC<BlockTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  blocks,
  columns = blockTableColumnConfigDefaults(),
  children,
  variant = 'scrollable',
  ...props
}) => {
  const breakPoint = useBreakpoint()
  return breakPoint ? (
    <TableEx variant={variant} {...props}>
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
            return (
              <TableCell key={index} width={index > 0 ? '10px' : undefined} align={index === 0 ? 'left' : 'center'}>
                {blockColumnNames[column]}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {blocks?.map((block, index) => (
          <BlockTableRowWithErrorBoundary
            archive={archive}
            key={`${Hasher.hash(block)}`}
            block={block}
            index={index}
            exploreDomain={exploreDomain}
            onRowClick={onRowClick}
            columns={columns}
          />
        ))}
        {children}
      </TableBody>
    </TableEx>
  ) : null
}
