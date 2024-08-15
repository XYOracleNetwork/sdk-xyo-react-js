import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

export interface IFrameRendererProps extends FlexBoxProps {
  uri?: string
}

export const IFrameRenderer: React.FC<IFrameRendererProps> = ({ uri, ...props }) => {
  return (
    <FlexCol {...props}>
      <Typography variant="h1">iFrame Loader</Typography>
    </FlexCol>
  )
}
