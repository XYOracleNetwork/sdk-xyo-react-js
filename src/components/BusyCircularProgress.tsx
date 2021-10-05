import { alpha, Box, CircularProgress, CircularProgressProps, useTheme } from '@mui/material'
import React from 'react'

interface Props extends CircularProgressProps {
  opacity?: number | string
  bgcolor?: string
  rounded?: boolean
  size?: string | number
}

const BusyCircularProgress: React.FC<Props> = ({ bgcolor, style, rounded, size, opacity = 0.85, ...props }) => {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      bgcolor={alpha(bgcolor ?? theme.palette.background.default, parseFloat(`${opacity}`))}
      flexGrow={1}
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      style={{ borderRadius: rounded ? theme.shape.borderRadius : 0, ...style }}
    >
      <CircularProgress size={size} {...props} />
    </Box>
  )
}

export default BusyCircularProgress
