import { Paper, Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'

export const PapersExample: React.FC = ({ ...props }) => {
  return (
    <FlexCol {...props}>
      <Typography variant="subtitle1">Paper</Typography>
      <FlexRow alignItems="stretch">
        {Array.from({ length: 5 }, () => {}).map((_, index) => (
          <FlexCol key={`paper-${index}`} marginRight={2}>
            <Paper key={`paper-${index}`} elevation={index * 2} color="secondary">
              <Typography margin={1}>Elevation-{index * 3}</Typography>
            </Paper>
          </FlexCol>
        ))}
      </FlexRow>
    </FlexCol>
  )
}
