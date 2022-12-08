import { Chip } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

export interface GasPriceEstimateActionsBoxProps extends FlexBoxProps {
  timestamp?: number
  baseFee?: number
  baseFeeLabel?: string
}

export const GasPriceHeaderActionsBox: React.FC<GasPriceEstimateActionsBoxProps> = ({ timestamp, baseFee, baseFeeLabel = 'Base Fee', ...props }) => {
  return (
    <FlexRow columnGap={1} {...props}>
      {timestamp ? <Chip label={new Date(timestamp).toLocaleString()} /> : null}
      {baseFee ? <Chip label={`${baseFeeLabel} - ${baseFee.toFixed(2)} GWEI`} /> : null}
    </FlexRow>
  )
}
