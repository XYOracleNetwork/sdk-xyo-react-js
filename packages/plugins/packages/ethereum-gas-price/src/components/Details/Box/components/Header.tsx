import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { GasPriceEstimateHeaderTypography, GasPriceHeaderActionsBox } from '@xyo-network/react-gas-price'

export interface GasPriceEstimateHeaderBoxProps extends FlexBoxProps {
  timestamp?: number
  baseFee?: number
}

export const GasPriceEstimateHeaderBox: React.FC<GasPriceEstimateHeaderBoxProps> = ({ timestamp, baseFee, ...props }) => {
  return (
    <FlexRow
      justifyItems="space-between"
      alignItems="end"
      columnGap={2}
      rowGap={2}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-between"
      {...props}
    >
      <GasPriceEstimateHeaderTypography heading="Gas Fee Estimate" />
      <GasPriceHeaderActionsBox timestamp={timestamp} baseFee={baseFee} />
    </FlexRow>
  )
}
