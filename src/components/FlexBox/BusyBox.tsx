import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

import BusyProps from '../../BusyProps'
import BusyCircularProgress from '../BusyCircularProgress'
import BusyLinearProgress from '../BusyLinearProgress'

interface BusyBoxProps extends BusyProps, BoxProps {}

const BusyBox: React.FC<BusyBoxProps> = ({
  children,
  busyVariant = 'circular',
  busySize,
  busyOpacity = 0.85,
  busyColor,
  busy,
  busyCircularProps,
  busyLinearProps,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
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
