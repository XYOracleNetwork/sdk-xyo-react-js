import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'

import { blockColumnNames, blockTableColumnConfigDefaults } from './BlockTableColumnConfig'
import { BlockTableProps } from './BlockTableProps'
import { BlockTableRowWithErrorBoundary } from './TableRowWithErrorBoundary'

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
          <BlockTableRowWithErrorBoundary
            key={`${block._hash}-${block._timestamp}-${index}`}
            block={block}
            index={index}
            exploreDomain={exploreDomain}
            onRowClick={onRowClick}
            columns={columns}
          />
        ))}
        {children}
      </TableBody>
    </Table>
  ) : null
}
