import { Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

export const StatsBanner: React.FC<FlexBoxProps> = (props) => {
  const theme = useTheme()
  return (
    <FlexRow justifyContent="space-between" {...props}>
      <Typography variant="h5" textAlign="center" color={theme.palette.common.white}>
        XYO Archivist
      </Typography>
    </FlexRow>
  )
}
