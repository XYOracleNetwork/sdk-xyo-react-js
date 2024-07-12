import { Table, TableProps } from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'

import { TableExVariants } from './types/index.js'

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
