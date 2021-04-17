import { Box, BoxProps, CircularProgress, useTheme } from '@material-ui/core'
import React from 'react'

interface BusyBoxProps extends BoxProps {
  busy?: boolean
  busyOpacity?: string | number
  busySize?: number
}

const BusyBox: React.ComponentType<BusyBoxProps> = (props) => {
  const theme = useTheme()
  const { children, busySize, busyOpacity = 0.85, busy, ...boxProps } = props
  return (
    <Box position="relative" {...boxProps}>
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
