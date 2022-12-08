import { styled } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

export const StyledGasPriceHeaderBox = styled(FlexRow, { name: 'StyledGasPriceEstimateBox' })(({ theme }) => ({
  alignItems: 'end',
  columnGap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  justifyItems: 'space-between',
  rowGap: theme.spacing(2),
  width: '100%',
}))
