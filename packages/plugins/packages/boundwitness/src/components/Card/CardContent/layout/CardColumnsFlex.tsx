import { styled } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'

export const CardColumnsFlex = styled(FlexCol, { name: 'CardColumnsFlex' })(({ theme }) => ({
  ['@media only screen and (min-width: 333px)']: {
    minWidth: '50%',
  },
  minWidth: '100%',
  rowGap: theme.spacing(1),
}))
