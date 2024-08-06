import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { SystemControlsRoot } from './SystemControlsRoot.tsx'
import { SystemControlsUnstyledProps } from './SystemControlsUnstyled.tsx'

const SystemControls: React.FC<SystemControlsUnstyledProps> = (props) => {
  return (
    <FlexCol>
      <SystemControlsRoot {...props} />
    </FlexCol>
  )
}

export { SystemControls }
