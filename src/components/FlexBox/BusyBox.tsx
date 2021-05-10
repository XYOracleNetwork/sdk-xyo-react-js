import { Box, BoxProps, CircularProgress, useTheme } from '@material-ui/core'
import React from 'react'

import { useBreakpoint } from '../../hooks'

interface BusyBoxProps extends BoxProps {
  busy?: boolean
  busyOpacity?: string | number
  busySize?: number
}

interface BusyBoxExProps extends BusyBoxProps {
  lg?: BusyBoxProps
  md?: BusyBoxProps
  sm?: BusyBoxProps
  xl?: BusyBoxProps
  xs?: BusyBoxProps
}

const BusyBox: React.ComponentType<BusyBoxExProps> = (props) => {
  const theme = useTheme()
  const breakpoint = useBreakpoint()
  const propsToUse = { ...props, ...(breakpoint ? props[breakpoint] : {}) }

  const { children, busySize, busyOpacity = 0.85, busy, ...rootProps } = propsToUse
  return (
    <Box position="relative" {...rootProps}>
      {children}
      {busy ? (
        <Box
          display="flex"
          bgcolor={props.bgcolor ?? theme.palette.background.default}
          flexGrow={1}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          style={{ opacity: busyOpacity }}
          zIndex={1000}
        >
          <CircularProgress size={busySize} />
        </Box>
      ) : null}
    </Box>
  )
}

export { BusyBox }
export type { BusyBoxProps }
