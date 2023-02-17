import { FlexBoxProps } from '@xylabs/react-flexbox'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledGasPriceHeaderBox } from '@xyo-network/react-gas-price'

import { DescriptionQuickTip } from './DescriptionQuickTip'

export interface GasPriceHeaderBoxProps extends FlexBoxProps {
  baseFee?: number
  heading?: string
  timestamp?: number
}

export const GasPriceHeaderBox: React.FC<GasPriceHeaderBoxProps> = ({ timestamp, baseFee, heading, ...props }) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading}>
        <DescriptionQuickTip />
      </GasPriceHeaderTypography>
      <GasPriceHeaderActionsBox timestamp={timestamp} baseFee={baseFee} />
    </StyledGasPriceHeaderBox>
  )
}
