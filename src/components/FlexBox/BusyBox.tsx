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
  busy,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      {children}
      {busy && busyVariant === 'linear' ? <BusyLinearProgress opacity={busyOpacity} /> : null}
      {busy && busyVariant === 'circular' ? <BusyCircularProgress opacity={busyOpacity} size={busySize} /> : null}
    </Box>
  )
}

export { BusyBox }
export type { BusyBoxProps }
