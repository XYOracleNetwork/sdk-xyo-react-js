import { BoxProps, Paper, useTheme } from '@material-ui/core'
import React from 'react'

import { FlexRow } from './FlexBox'

interface Props extends BoxProps {
  paper?: boolean
}

const Background: React.FC<Props> = (props) => {
  const { paper, style, ...rootProps } = props
  const theme = useTheme()
  if (paper) {
    return <FlexRow component={Paper} {...rootProps} />
  }
  return (
    <FlexRow
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        ...style,
      }}
      {...rootProps}
    />
  )
}

export default Background
