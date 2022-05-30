import { Typography } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/sdk-react'

const NotFound: React.FC<FlexBoxProps> = (props) => {
  return (
    <FlexGrowCol {...props}>
      <Typography variant="h2">Sorry!</Typography>
      <Typography marginY={3} variant="body2">
        {"Can't find anything here"}
      </Typography>
    </FlexGrowCol>
  )
}

export { NotFound }
