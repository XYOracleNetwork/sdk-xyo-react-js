import { Table, TableProps } from '@mui/material'
import { PropsWithChildren } from 'react'

import { TableExVariants } from './lib'

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: TableExVariants
}

const TableExInner: React.FC<TableExProps> = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>
}

export const TableEx: React.FC<TableExProps> = ({ variant, children, ...props }) => {
  return (
    <TableExInner stickyHeader={variant === 'scrollable'} {...props}>
      {children}
    </TableExInner>
  )
}
