import { Chip } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

export interface GasPriceEstimateActionsBoxProps extends FlexBoxProps {
  timestamp?: number
  baseFee?: number
}

export const GasPriceHeaderActionsBox: React.FC<GasPriceEstimateActionsBoxProps> = ({ timestamp, baseFee, ...props }) => {
  return (
    <FlexRow columnGap={1} {...props}>
      {timestamp ? <Chip label={new Date(timestamp).toLocaleString()} /> : null}
      {baseFee ? <Chip label={`Base Fee - ${baseFee.toFixed(2)} GWEI`} /> : null}
    </FlexRow>
  )
}
