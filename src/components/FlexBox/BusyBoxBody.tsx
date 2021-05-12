import { Box, BoxProps, CircularProgress, useTheme } from '@material-ui/core'
import React from 'react'

interface Props extends BoxProps {
  opacity?: string | number
  size?: string | number
}

const BusyBoxBody: React.FC<Props> = (props) => {
  const { size, opacity, ...rootProps } = props
  const theme = useTheme()
  return (
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
      style={{ opacity }}
      zIndex={1000}
      {...rootProps}
    >
      <CircularProgress size={size} />
    </Box>
  )
}

export default BusyBoxBody
