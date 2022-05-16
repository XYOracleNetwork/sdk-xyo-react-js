import { Theme, useMediaQuery } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'

import { ArchiveSelectEx, useArchive } from '../../../archive'
import { NetworkSelectEx, useNetwork } from '../../../network'
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
              <FlexRow paper className={'control-wrap'}>
                <NetworkSelectEx responsive={false} className="network-ex" />
              </FlexRow>
              <FlexRow paper>
                <ArchiveSelectEx />
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
