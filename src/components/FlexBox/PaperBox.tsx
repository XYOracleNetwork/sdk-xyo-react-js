import { Box, CircularProgress, Paper, PaperProps, useTheme } from '@material-ui/core'
import React from 'react'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'
import BusyComponentProps from '../../BusyComponentProps'
import mergeBoxlikeStyles from '../../mergeBoxlikeStyles'

interface PaperBoxProps extends PaperProps, BoxlikeComponentProps, BusyComponentProps {}

const PaperBox: React.FC<PaperBoxProps> = (props) => {
  const theme = useTheme()
  const { children, busySize, busyOpacity = 0.85, busy, ...rootProps } = mergeBoxlikeStyles<PaperBoxProps>(
    theme,
    props,
    { position: 'relative' }
  )
  return (
    <Paper {...rootProps}>
      {children}
      {busy ? (
        <Box
          display="flex"
          bgcolor={props.bgcolor ?? theme.palette.background.paper}
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
    </Paper>
  )
}

export { PaperBox }
export type { PaperBoxProps }
