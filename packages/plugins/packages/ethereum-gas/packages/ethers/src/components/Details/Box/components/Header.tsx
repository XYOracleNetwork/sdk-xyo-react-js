import { FlexBoxProps } from '@xylabs/react-flexbox'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledGasPriceHeaderBox } from '@xyo-network/react-gas-price'

export interface GasPriceEthersHeaderBoxProps extends FlexBoxProps {
  baseFee?: number
  baseFeeLabel?: string
  blockNumber?: number
  blockNumberLabel?: string
  heading?: string
  timestamp?: number
}

export const GasPriceEthersHeaderBox: React.FC<GasPriceEthersHeaderBoxProps> = ({
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
