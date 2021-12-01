/* eslint-disable @delagen/deprecation/deprecation */
import React, { PropsWithChildren } from 'react'

/** @deprecated Moved to @xylabs/sdk-react */
export interface ExperimentProps {
  weight: number
}

/** @deprecated Moved to @xylabs/sdk-react */
const Experiment: React.FC<PropsWithChildren<ExperimentProps>> = (props) => {
  const { children } = props
  return <>{children}</>
}

export default Experiment
