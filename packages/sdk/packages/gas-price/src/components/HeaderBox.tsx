import { FlexBoxProps } from '@xylabs/react-flexbox'

import { GasPriceWitnessUIBasePayload } from '../types'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from './HeaderComponents'
import { StyledGasPriceHeaderBox } from './layout'

export interface GasPriceWitnessHeaderBoxProps extends FlexBoxProps {
  heading?: string
  parsedPayload?: GasPriceWitnessUIBasePayload
}

export const GasPriceWitnessHeaderBox: React.FC<GasPriceWitnessHeaderBoxProps> = ({ heading, parsedPayload, ...props }) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading} />
      <GasPriceHeaderActionsBox
        timestamp={parsedPayload?.timestamp}
        baseFee={parsedPayload?.baseFee?.value}
        baseFeeLabel={parsedPayload?.baseFee?.label}
        blockNumber={parsedPayload?.blockNumber?.value}
        blockNumberLabel={parsedPayload?.blockNumber?.label}
      />
    </StyledGasPriceHeaderBox>
  )
}
