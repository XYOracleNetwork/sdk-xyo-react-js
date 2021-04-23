import React, { PropsWithChildren } from 'react'

export interface ExperimentProps {
  weight: number
}

const Experiment: React.FC<PropsWithChildren<ExperimentProps>> = (props) => {
  const { children } = props
  return <>{children}</>
}

export default Experiment
