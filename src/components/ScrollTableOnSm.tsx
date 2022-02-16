import { styled } from '@mui/system'

const StyledScrollTableOnSm = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    overflowX: 'scroll',
  },
  display: 'flex',
  flexGrow: 1,
}))

const ScrollTableOnSm: React.FC = ({ children }) => <StyledScrollTableOnSm>{children}</StyledScrollTableOnSm>

export { ScrollTableOnSm }
