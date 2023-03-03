import { Paper, Theme, useMediaQuery } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { NetworkSelectEx } from '@xyo-network/react-network'

import { SystemControl } from './controls'
import { SystemControlsType } from './SystemControlsType'

interface SystemControlsUnstyledProps extends FlexBoxProps {
  systemControlsType?: SystemControlsType
  visible?: boolean
}

const SystemControlsUnstyled: React.FC<SystemControlsUnstyledProps> = ({
  visible,
  systemControlsType = SystemControlsType.WindowShade,
  ...props
}) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  if (visible || isSmall) {
    return (
      <FlexCol {...props} className={`${props.className} system-controls-type-${systemControlsType}`}>
        <SystemControl
          systemControlsType={systemControlsType}
          controlElement={
            <>
              <FlexRow className={'control-wrap'}>
                <Paper variant="elevation" elevation={0}>
                  <NetworkSelectEx responsive={false} className="network-ex" />
                </Paper>
              </FlexRow>
            </>
          }
        />
      </FlexCol>
    )
  } else {
    return <FlexCol />
  }
}

export type { SystemControlsUnstyledProps }
export { SystemControlsUnstyled }
