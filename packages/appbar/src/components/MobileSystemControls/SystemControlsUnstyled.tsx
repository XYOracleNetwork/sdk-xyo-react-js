import { Paper, Theme, useMediaQuery } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'
import { ArchiveSelectEx, useArchive } from '@xyo-network/react-archive'
import { NetworkSelectEx, useNetwork } from '@xyo-network/react-network'

import { ControlText, SystemControl } from './controls'
import { SystemControlsType } from './SystemControlsType'

interface SystemControlsUnstyledProps extends FlexBoxProps {
  visible?: boolean
  systemControlsType?: SystemControlsType
}

const SystemControlsUnstyled: React.FC<SystemControlsUnstyledProps> = ({ systemControlsType = SystemControlsType.WindowShade, visible, ...props }) => {
  const { network } = useNetwork()
  const { archive } = useArchive()
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  if (visible || isSmall) {
    return (
      <FlexCol {...props} className={`${props.className} system-controls-type-${systemControlsType}`}>
        <SystemControl
          systemControlsType={systemControlsType}
          controlElement={
            <>
              <FlexRow className={'control-wrap'}>
                <Paper variant="elevation">
                  <NetworkSelectEx responsive={false} className="network-ex" />
                </Paper>
              </FlexRow>
              <FlexRow>
                <Paper variant="elevation">
                  <ArchiveSelectEx />
                </Paper>
              </FlexRow>
            </>
          }
        >
          <ControlText value={`${network?.name} : ${archive ?? 'temp'} `} />
        </SystemControl>
      </FlexCol>
    )
  } else {
    return <FlexCol />
  }
}

export type { SystemControlsUnstyledProps }
export { SystemControlsUnstyled }
