/* eslint-disable @delagen/deprecation/deprecation */
import { Box, BoxProps, Paper, useTheme } from '@mui/material'
import React from 'react'

import BusyProps from '../../BusyProps'
import BusyCircularProgress from '../BusyCircularProgress'
import BusyLinearProgress from '../BusyLinearProgress'

/** @deprecated Moved to @xylabs/sdk-react */
interface BusyBoxProps extends BusyProps, BoxProps {
  paper?: boolean
  background?: boolean
}

/** @deprecated Moved to @xylabs/sdk-react */
const BusyBox: React.FC<BusyBoxProps> = ({
  background,
  children,
  component,
  busyVariant = 'circular',
  busySize,
  busyOpacity = 0.85,
  busyColor,
  busy,
  busyCircularProps,
  busyLinearProps,
  paper,
  style,
  ...props
}) => {
  const theme = useTheme()
  return (
    <Box
      component={paper ? Paper : component}
      position="relative"
      style={
        background
          ? {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              ...style,
            }
          : style
      }
      {...props}
    >
      {children}
      {busy && busyVariant === 'linear' ? (
        <BusyLinearProgress color={busyColor} opacity={busyOpacity} {...busyLinearProps} />
      ) : null}
      {busy && busyVariant === 'circular' ? (
        <BusyCircularProgress color={busyColor} opacity={busyOpacity} size={busySize} {...busyCircularProps} />
      ) : null}
    </Box>
  )
}

export { BusyBox }
export type { BusyBoxProps }
