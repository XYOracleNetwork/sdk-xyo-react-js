import { Box, BoxProps } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export interface ExperimentProps extends BoxProps {
  weight: number
}

const Experiment: React.FC<PropsWithChildren<ExperimentProps>> = (props) => {
  return <Box {...props} />
}

export default Experiment
