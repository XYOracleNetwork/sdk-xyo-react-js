import { Table, TableProps } from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'

import { TableExVariants } from './lib'

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: TableExVariants
}

const TableExInner: React.FC<TableExProps> = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>
}

export const TableExWithRef: React.FC<TableExProps> = forwardRef(({ variant, children, ...props }, ref) => {
  return (
    <TableExInner stickyHeader={variant === 'scrollable'} ref={ref} {...props}>
      {children}
    </TableExInner>
  )
})

TableExWithRef.displayName = 'TableEx'

export const TableEx = TableExWithRef
