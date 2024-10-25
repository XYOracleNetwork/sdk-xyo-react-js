import { styled } from '@mui/material'
import type { PropsWithChildren } from 'react'
import React from 'react'

const StyledScrollTableOnSm = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: { overflowX: 'scroll' },
  display: 'flex',
  flexGrow: 1,
}))

const ScrollTableOnSm: React.FC<PropsWithChildren> = ({ children }) => <StyledScrollTableOnSm>{children}</StyledScrollTableOnSm>

export { ScrollTableOnSm }
