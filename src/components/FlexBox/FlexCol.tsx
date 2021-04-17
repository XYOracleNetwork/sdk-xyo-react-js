import React from 'react'

import { BusyBox, BusyBoxProps } from './BusyBox'

const FlexCol: React.ComponentType<BusyBoxProps> = (props) => {
  return <BusyBox alignItems="center" display="flex" flexDirection="column" justifyContent="center" {...props} />
}

const FlexGrowCol: React.ComponentType<BusyBoxProps> = (props) => {
  return <FlexCol flexGrow={1} {...props} />
}

export { FlexCol, FlexGrowCol }
