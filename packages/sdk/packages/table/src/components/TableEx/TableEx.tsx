import type { TableProps } from '@mui/material'
import { Table } from '@mui/material'
import type { PropsWithChildren } from 'react'
import React from 'react'

import type { TableExVariants } from './types/index.ts'

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: TableExVariants
}

const TableExInner: React.FC<TableExProps> = ({ children, ...props }) => {
  return (
    <Table {...props}>
      {children}
    </Table>
  )
}

TableExInner.displayName = 'TableExInner'

export const TableExWithRef: React.FC<TableExProps> = ({
  variant, children, ...props
}) => {
  return (
    <TableExInner stickyHeader={variant === 'scrollable'} {...props}>
      {children}
    </TableExInner>
  )
}

TableExWithRef.displayName = 'TableEx'

export const TableEx = TableExWithRef
