import { FlexBoxProps } from '@xylabs/react-flexbox'

import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from './HeaderComponents'
import { StyledGasPriceHeaderBox } from './layout'

export interface GasPriceWitnessHeaderBoxProps extends FlexBoxProps {
  baseFee?: number
  baseFeeLabel?: string
  blockNumber?: number
  blockNumberLabel?: string
  heading?: string
  timestamp?: number
}

export const GasPriceWitnessHeaderBox: React.FC<GasPriceWitnessHeaderBoxProps> = ({
  timestamp,
  baseFee,
  baseFeeLabel,
  blockNumber,
  blockNumberLabel,
  heading,
  ...props
}) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading} />
      <GasPriceHeaderActionsBox
        timestamp={timestamp}
        baseFee={baseFee}
        baseFeeLabel={baseFeeLabel}
        blockNumber={blockNumber}
        blockNumberLabel={blockNumberLabel}
      />
    </StyledGasPriceHeaderBox>
  )
}
