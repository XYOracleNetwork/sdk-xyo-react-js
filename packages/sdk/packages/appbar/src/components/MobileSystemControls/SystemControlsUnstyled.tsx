import type { Theme } from '@mui/material'
import { Paper, useMediaQuery } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { NetworkSelectEx } from '@xyo-network/react-network'
import React from 'react'

import { SystemControl } from './controls/index.ts'
import { SystemControlsType } from './SystemControlsType.ts'

interface SystemControlsUnstyledProps extends FlexBoxProps {
  systemControlsType?: SystemControlsType
  visible?: boolean
}

const SystemControlsUnstyled: React.FC<SystemControlsUnstyledProps> = ({
  visible,
  systemControlsType = SystemControlsType.WindowShade,
  ...props
}) => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return visible || isSmall
    ? (
        <FlexCol {...props} className={`${props.className} system-controls-type-${systemControlsType}`}>
          <SystemControl
            systemControlsType={systemControlsType}
            controlElement={(
              <FlexRow className="control-wrap">
                <Paper variant="elevation" elevation={0}>
                  <NetworkSelectEx responsive={false} className="network-ex" />
                </Paper>
              </FlexRow>
            )}
          />
        </FlexCol>
      )
    : <FlexCol />
}

export type { SystemControlsUnstyledProps }
export { SystemControlsUnstyled }
