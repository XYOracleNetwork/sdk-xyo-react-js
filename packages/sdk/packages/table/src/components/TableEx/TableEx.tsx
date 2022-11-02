import { Table, TableProps } from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'

import { TableExVariants } from './types'

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: TableExVariants
}

const TableExInner: React.FC<TableExProps> = forwardRef(({ children, ...props }, ref) => {
  return (
    <Table ref={ref} {...props}>
      {children}
    </Table>
  )
})

TableExInner.displayName = 'TableExInner'

export const TableExWithRef: React.FC<TableExProps> = forwardRef(({ variant, children, ...props }, ref) => {
  return (
    <TableExInner stickyHeader={variant === 'scrollable'} ref={ref} {...props}>
      {children}
    </TableExInner>
  )
})

TableExWithRef.displayName = 'TableEx'

export const TableEx = TableExWithRef
