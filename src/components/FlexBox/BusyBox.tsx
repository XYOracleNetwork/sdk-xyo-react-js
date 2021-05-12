import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

import BusyProps from '../../BusyProps'
import { useBreakpoint } from '../../hooks'
import BusyBoxBody from './BusyBoxBody'

interface BusyBoxBaseProps extends BusyProps, BoxProps {}

interface BusyBoxProps extends BusyBoxBaseProps {
  lg?: BusyBoxBaseProps
  md?: BusyBoxBaseProps
  sm?: BusyBoxBaseProps
  xl?: BusyBoxBaseProps
  xs?: BusyBoxBaseProps
}

const BusyBox: React.FC<BusyBoxProps> = (props) => {
  const breakpoint = useBreakpoint()
  const propsToUse = { ...props, ...(breakpoint ? props[breakpoint] : {}) }

  const { children, busySize, busyOpacity = 0.85, busy, ...rootProps } = propsToUse
  return (
    <Box position="relative" {...rootProps}>
      {children}
      {busy ? <BusyBoxBody opacity={busyOpacity} size={busySize} /> : null}
    </Box>
  )
}

export { BusyBox }
export type { BusyBoxProps }
