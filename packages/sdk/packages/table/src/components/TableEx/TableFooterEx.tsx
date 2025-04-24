import type { TableFooterProps } from '@mui/material'
import { styled, TableFooter } from '@mui/material'
import type { PropsWithChildren } from 'react'
import React from 'react'

import type { TableExVariants } from './types/index.ts'

const TableFooterExRoot = styled(TableFooter, {
  name: 'TableFooterEx',
  shouldForwardProp: propName => propName !== 'scrollable',
  slot: 'Root',
})<TableFooterExProps>(({ variant, theme }) => ({
  backgroundColor: theme.vars.palette.background.default,
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
