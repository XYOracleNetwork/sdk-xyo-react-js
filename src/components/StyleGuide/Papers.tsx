import { FlexCol, FlexRow } from '@xylabs/sdk-react'
import { Paper, Typography } from '@mui/material'

export const Papers: React.FC = ({ ...props }) => {
  return (
    <FlexCol {...props}>
      <Typography variant="subtitle1">Paper</Typography>
      <FlexRow alignItems="stretch">
        {Array.from({ length: 25 }, () => undefined).map((_, index) => (
          <Paper key={`paper-${index}`} square elevation={index} />
        ))}
      </FlexRow>
    </FlexCol>
  )
}