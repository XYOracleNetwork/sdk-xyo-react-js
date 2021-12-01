/* eslint-disable @delagen/deprecation/deprecation */
import React from 'react'

import { BusyBox, BusyBoxProps } from './BusyBox'

/** @deprecated Moved to @xylabs/sdk-react */
type FlexBoxProps = BusyBoxProps

/** @deprecated Moved to @xylabs/sdk-react */
const FlexRow: React.FC<FlexBoxProps> = (props) => {
  return <BusyBox alignItems="center" display="flex" flexDirection="row" justifyContent="center" {...props} />
}

/** @deprecated Moved to @xylabs/sdk-react */
const FlexGrowRow: React.FC<FlexBoxProps> = (props) => {
  return <FlexRow flexGrow={1} {...props} />
}

export { FlexGrowRow, FlexRow }
export type { FlexBoxProps }
