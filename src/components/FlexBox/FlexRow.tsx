import React from 'react'

import { BusyBox, BusyBoxProps } from './BusyBox'

type FlexBoxProps = BusyBoxProps

const FlexRow: React.FC<FlexBoxProps> = (props) => {
  return <BusyBox alignItems="center" display="flex" flexDirection="row" justifyContent="center" {...props} />
}

const FlexGrowRow: React.FC<FlexBoxProps> = (props) => {
  return <FlexRow flexGrow={1} {...props} />
}

export { FlexGrowRow, FlexRow }
export type { FlexBoxProps }
