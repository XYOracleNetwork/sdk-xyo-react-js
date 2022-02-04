import { Typography } from '@mui/material'
import { FlexGrowCol } from '@xylabs/sdk-react'

const NotFound = () => {
  return (
    <>
      <FlexGrowCol>
        <Typography variant="h2">Sorry!</Typography>
        <Typography marginY={3} variant="body2">
          Can't find anything here
        </Typography>
      </FlexGrowCol>
    </>
  )
}

export { NotFound }
