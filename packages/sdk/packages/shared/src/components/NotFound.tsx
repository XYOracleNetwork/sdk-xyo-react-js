import { Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import React from 'react'

/** @deprecated use from @@xylabs/react-shared instead */
export const NotFound: React.FC<FlexBoxProps> = (props) => {
  return (
    <FlexGrowCol {...props}>
      <Typography variant="h2">Sorry!</Typography>
      <Typography marginY={3} variant="body2">
        {'Can\'t find anything here'}
      </Typography>
    </FlexGrowCol>
  )
}
