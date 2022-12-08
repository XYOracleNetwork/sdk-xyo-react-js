import { FlexBoxProps } from '@xylabs/react-flexbox'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledGasPriceHeaderBox } from '@xyo-network/react-gas-price'

export interface GasPriceEtherscanHeaderBoxProps extends FlexBoxProps {
  baseFee?: number
  baseFeeLabel?: string
  heading?: string
  timestamp?: number
}

export const GasPriceEtherscanHeaderBox: React.FC<GasPriceEtherscanHeaderBoxProps> = ({ timestamp, baseFee, baseFeeLabel, heading, ...props }) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading} />
      <GasPriceHeaderActionsBox timestamp={timestamp} baseFee={baseFee} baseFeeLabel={baseFeeLabel} />
    </StyledGasPriceHeaderBox>
  )
}
