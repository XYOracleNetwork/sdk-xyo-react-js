import { Collapse, CollapseProps } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, WithChildren } from '@xylabs/sdk-react'
import { useState } from 'react'

import { SystemControlsType } from '../SystemControlsType'

interface SystemControlProps extends FlexBoxProps {
  controlElement: React.ReactNode
  systemControlsType?: SystemControlsType
}

const SystemControl: React.FC<WithChildren<SystemControlProps>> = ({ children, controlElement, systemControlsType = SystemControlsType.WindowShade, ...props }) => {
  const [toggleControls, setToggleControls] = useState(false)

  let orientation: CollapseProps['orientation'] = 'vertical'

  switch (systemControlsType) {
    case SystemControlsType.Left: {
      orientation = 'horizontal'
      break
    }
  }

  return (
    <FlexRow className="controls" {...props}>
      <Collapse in={toggleControls} orientation={orientation} timeout={500}>
        <FlexRow bgcolor="primary.main" className="control">
          {controlElement}
        </FlexRow>
      </Collapse>
      <FlexCol onClick={() => setToggleControls(!toggleControls)}>{children}</FlexCol>
    </FlexRow>
  )
}

export { SystemControl }
