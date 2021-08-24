import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

import BusyProps from '../../BusyProps'
import BusyBoxCircularProgress from './BusyBoxCircularProgress'
import BusyBoxLinearProgress from './BusyBoxLinearProgress'

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
      {busy && busyVariant === 'linear' ? <BusyBoxLinearProgress opacity={busyOpacity} /> : null}
      {busy && busyVariant === 'circular' ? <BusyBoxCircularProgress opacity={busyOpacity} size={busySize} /> : null}
    </Box>
  )
}

export { BusyBox }
export type { BusyBoxProps }
