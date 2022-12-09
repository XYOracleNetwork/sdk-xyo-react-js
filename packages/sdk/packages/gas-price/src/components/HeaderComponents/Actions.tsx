import { Chip } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

export interface GasPriceEstimateActionsBoxProps extends FlexBoxProps {
  timestamp?: number
  baseFee?: number
  baseFeeLabel?: string
  blockNumber?: number
  blockNumberLabel?: string
}

export const GasPriceHeaderActionsBox: React.FC<GasPriceEstimateActionsBoxProps> = ({
  timestamp,
  baseFee,
  baseFeeLabel = 'Base Fee',
  blockNumber,
  blockNumberLabel = 'Block Number',
  ...props
}) => {
  return (
    <FlexRow columnGap={1} rowGap={1} flexWrap="wrap" {...props}>
      {timestamp ? <Chip label={new Date(timestamp).toLocaleString()} /> : null}
      {baseFee ? <Chip label={`${baseFeeLabel} - ${baseFee.toFixed(2)} GWEI`} /> : null}
      {blockNumber ? <Chip label={`${blockNumberLabel} - ${blockNumber}`} /> : null}
    </FlexRow>
  )
}
