import { Box, BoxProps, LinearProgress, useTheme } from '@material-ui/core'
import React from 'react'

interface Props extends BoxProps {
  opacity?: string | number
}

const BusyBoxLinearProgress: React.FC<Props> = ({ opacity = 0.85, ...props }) => {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor={props.bgcolor ?? theme.palette.background.default}
      flexGrow={1}
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      justifyContent="center"
      alignItems="stretch"
      style={{ opacity }}
      zIndex={1000}
      {...props}
    >
      <LinearProgress />
    </Box>
  )
}

export default BusyBoxLinearProgress
