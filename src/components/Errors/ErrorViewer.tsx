import { BoxProps, Typography, useTheme } from '@material-ui/core'
import React from 'react'

import { FlexCol } from '../FlexBox'

interface Props extends BoxProps {
  error?: Error
}

const ErrorViewer: React.FC<Props> = (props) => {
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
