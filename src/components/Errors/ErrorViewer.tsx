import { Typography, useTheme } from '@mui/material'
import React from 'react'

import { FlexCol } from '../FlexBox'
import ErrorViewerProps from './ErrorViewerProps'

const ErrorViewer: React.FC<ErrorViewerProps> = (props) => {
  const { error, ...boxProps } = props
  const theme = useTheme()
  return (
    <FlexCol color={theme.palette.error.main} {...boxProps}>
      <Typography align="center" variant="subtitle1">
        {error?.name}
      </Typography>
      <Typography align="center" variant="body2">
        {error?.message}
      </Typography>
    </FlexCol>
  )
}

export default ErrorViewer
