import { styled } from '@mui/material'
import { WithChildren } from '@xylabs/sdk-react'

const StyledScrollTableOnSm = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    overflowX: 'scroll',
  },
  display: 'flex',
  flexGrow: 1,
}))

const ScrollTableOnSm: React.FC<WithChildren> = ({ children }) => <StyledScrollTableOnSm>{children}</StyledScrollTableOnSm>

export { ScrollTableOnSm }
