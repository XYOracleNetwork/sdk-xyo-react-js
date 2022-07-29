import { FlexCol } from '@xylabs/react-flexbox'

import { SystemControlsRoot } from './SystemControlsRoot'
import { SystemControlsUnstyledProps } from './SystemControlsUnstyled'

const SystemControls: React.FC<SystemControlsUnstyledProps> = (props) => {
  return (
    <FlexCol>
      <SystemControlsRoot {...props} />
    </FlexCol>
  )
}

export { SystemControls }
