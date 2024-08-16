import type { TableProps } from '@mui/material'
import { Table } from '@mui/material'
import type { PropsWithChildren } from 'react'
import React, { forwardRef } from 'react'

import type { TableExVariants } from './types/index.ts'

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: TableExVariants
}

const TableExInner = forwardRef<HTMLTableElement, TableExProps>(({ children, ...props }, ref) => {
  return (
    <Table ref={ref} {...props}>
      {children}
    </Table>
  )
})

TableExInner.displayName = 'TableExInner'

export const TableExWithRef = forwardRef<HTMLTableElement, TableExProps>(({ variant, children, ...props }, ref) => {
  return (
    <TableExInner stickyHeader={variant === 'scrollable'} ref={ref} {...props}>
      {children}
    </TableExInner>
  )
})

TableExWithRef.displayName = 'TableEx'

export const TableEx = TableExWithRef
