/* eslint-disable @delagen/deprecation/deprecation */
import React from 'react'

import { BusyBox, BusyBoxProps } from './BusyBox'

/** @deprecated Moved to @xylabs/sdk-react */
const FlexCol: React.ComponentType<BusyBoxProps> = (props) => {
  return <BusyBox alignItems="center" display="flex" flexDirection="column" justifyContent="center" {...props} />
}

/** @deprecated Moved to @xylabs/sdk-react */
const FlexGrowCol: React.ComponentType<BusyBoxProps> = (props) => {
  return <FlexCol flexGrow={1} {...props} />
}

export { FlexCol, FlexGrowCol }
