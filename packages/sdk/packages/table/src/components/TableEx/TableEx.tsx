import { styled, Table, TableProps } from '@mui/material'
import { CSSProperties, PropsWithChildren } from 'react'

const ScrollableTableExWrapper = styled('div', {
  name: 'ScrollableTableEx',
  shouldForwardProp: (propName) => propName !== 'wrapperHeight' && propName !== 'variant',
  slot: 'Wrapper',
})<TableExProps>(({ wrapperHeight }) => ({
  height: wrapperHeight,
  overflow: 'auto',
}))

export interface TableExProps extends PropsWithChildren, TableProps {
  variant?: 'scrollable'
  wrapperHeight?: CSSProperties['height']
}

const TableExInner: React.FC<TableExProps> = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>
}

export const TableEx: React.FC<TableExProps> = ({ variant, wrapperHeight = '100vh', children, ...props }) => {
  if (variant === 'scrollable') {
    return (
      <ScrollableTableExWrapper wrapperHeight={wrapperHeight}>
        <TableExInner stickyHeader {...props}>
          {children}
        </TableExInner>
      </ScrollableTableExWrapper>
    )
  } else {
    return <TableExInner {...props}>{children}</TableExInner>
  }
}
