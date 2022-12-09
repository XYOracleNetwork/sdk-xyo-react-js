import { CardHeader, styled } from '@mui/material'

export const StyledCardHeader = styled(CardHeader, { name: 'StyledCardHeader' })(({ theme }) => ({
  flexWrap: 'wrap',
  rowGap: theme.spacing(2),
}))
