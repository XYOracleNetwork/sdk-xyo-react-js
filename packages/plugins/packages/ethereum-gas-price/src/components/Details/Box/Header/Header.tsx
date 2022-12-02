import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

import { GasPriceHeaderActionsBox } from './Actions'
import { GasPriceEstimateHeadingTypography } from './Heading'

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
      <GasPriceEstimateHeadingTypography />
      <GasPriceHeaderActionsBox timestamp={timestamp} baseFee={baseFee} />
    </FlexRow>
  )
}
