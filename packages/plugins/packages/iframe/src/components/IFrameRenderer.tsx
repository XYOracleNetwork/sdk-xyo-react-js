import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import React from 'react'

export interface IFrameRendererProps extends FlexBoxProps {
  payload?: Payload
}

export const IFrameRenderer: React.FC<IFrameRendererProps> = ({ payload, ...props }) => {
  return (
    <FlexCol {...props}>
      <Typography variant="h1">iFrame Loader</Typography>

    </FlexCol>
  )
}
