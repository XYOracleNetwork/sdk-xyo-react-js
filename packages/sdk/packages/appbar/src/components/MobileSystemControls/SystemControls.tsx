import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { SystemControlsRoot } from './SystemControlsRoot.js'
import { SystemControlsUnstyledProps } from './SystemControlsUnstyled.js'

const SystemControls: React.FC<SystemControlsUnstyledProps> = (props) => {
  return (
    <FlexCol>
      <SystemControlsRoot {...props} />
    </FlexCol>
  )
}

export { SystemControls }
