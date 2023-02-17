import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'

export const NoBlockSelectedBox: React.FC = () => (
  <FlexCol justifyContent="center">
    <Typography variant="h2">No Block Selected</Typography>
    <Typography variant="subtitle1">Select a block to see details like address, signatures, and payload schemas</Typography>
  </FlexCol>
)
