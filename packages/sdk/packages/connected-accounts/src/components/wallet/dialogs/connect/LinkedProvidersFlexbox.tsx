import { SyncAlt } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'

import { xyoColorLogo } from '../../../../img'

export interface LinkedProvidersFlexboxProps extends FlexBoxProps {
  icon?: string
  providerName?: string
}

export const LinkedProvidersFlexbox: React.FC<LinkedProvidersFlexboxProps> = ({ icon, providerName, ...props }) => {
  return (
    <FlexRow gap={4} justifyContent="space-evenly" {...props}>
      <FlexCol gap={0.5}>
        <img alt="XYO Logo" src={xyoColorLogo} style={{ height: '48px' }} />
        <Typography variant="subtitle1">XYO App</Typography>
      </FlexCol>
      <SyncAlt fontSize={'large'} />
      <FlexCol gap={0.5}>
        <ConstrainedImage constrainedValue={'48px'} src={icon} alt={providerName} style={{ height: '48px', maxWidth: '48px' }} />
        <Typography variant="subtitle1">{providerName}</Typography>
      </FlexCol>
    </FlexRow>
  )
}
