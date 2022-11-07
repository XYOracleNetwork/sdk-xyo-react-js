import { styled, TableFooter, TableFooterProps } from '@mui/material'
import { PropsWithChildren } from 'react'

import { TableExVariants } from './types'

const TableFooterExRoot = styled(TableFooter, {
  name: 'TableFooterEx',
  shouldForwardProp: (propName) => propName !== 'scrollable',
  slot: 'Root',
})<TableFooterExProps>(({ variant, theme }) => ({
  backgroundColor: theme.palette.background.default,
  bottom: 'unset',
  position: 'relative',
  ...(variant === 'scrollable' && {
    bottom: 0,
    position: 'sticky',
  }),
}))

export interface TableFooterExProps extends PropsWithChildren, TableFooterProps {
  variant?: TableExVariants
}

export const TableFooterEx: React.FC<TableFooterExProps> = ({ children, ...props }) => <TableFooterExRoot {...props}>{children}</TableFooterExRoot>
