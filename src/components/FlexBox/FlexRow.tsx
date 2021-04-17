import React from 'react'

import { BusyBox, BusyBoxProps } from './BusyBox'

const FlexRow: React.ComponentType<BusyBoxProps> = (props) => {
  return <BusyBox alignItems="center" display="flex" flexDirection="row" justifyContent="center" {...props} />
}

const FlexGrowRow: React.ComponentType<BusyBoxProps> = (props) => {
  return <FlexRow flexGrow={1} {...props} />
}

export { FlexGrowRow, FlexRow }
