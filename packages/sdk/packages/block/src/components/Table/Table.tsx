import {
  TableBody, TableCell, TableHead, TableRow,
} from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { isDefined } from '@xylabs/typeof'
import { usePayloadHashes } from '@xyo-network/react-shared'
import { TableEx } from '@xyo-network/react-table'
import React from 'react'

import { blockColumnNames, blockTableColumnConfigDefaults } from './BlockTableColumnConfig.ts'
import type { BlockTableProps } from './BlockTableProps.ts'
import { BlockTableRowWithErrorBoundary } from './TableRowWithErrorBoundary.tsx'

export const BlockTable: React.FC<BlockTableProps> = ({
  clickableFields,
  onRowClick,
  blocks,
  columns,
  children,
  variant = 'scrollable',
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const blockPairs = usePayloadHashes(blocks)
  return isDefined(breakPoint)
    ? (
        <TableEx variant={variant} {...props}>
          <TableHead>
            <TableRow>
              {(columns ?? blockTableColumnConfigDefaults())[breakPoint]?.map((column, index) => {
                return (
                  <TableCell key={index} width={index > 0 ? '10px' : undefined} align={index === 0 ? 'left' : 'center'}>
                    {blockColumnNames[column]}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {blockPairs?.map(([block, hash], index) => (
              <BlockTableRowWithErrorBoundary
                clickableFields={clickableFields}
                key={hash}
                block={block}
                index={index}
                onRowClick={onRowClick}
                columns={columns}
              />
            ))}
            {children}
          </TableBody>
        </TableEx>
      )
    : null
}
