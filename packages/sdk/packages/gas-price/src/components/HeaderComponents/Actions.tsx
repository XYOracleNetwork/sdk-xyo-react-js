import { Chip } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

export interface GasPriceEstimateActionsBoxProps extends FlexBoxProps {
  baseFee?: number
  baseFeeLabel?: string
  blockNumber?: number
  blockNumberLabel?: string
  timestamp?: number
}

export const GasPriceHeaderActionsBox: React.FC<GasPriceEstimateActionsBoxProps> = ({
  baseFee,
  baseFeeLabel = 'Base Fee',
  blockNumber,
  blockNumberLabel = 'Block Number',
  timestamp,
  ...props
}) => {
  return (
    <FlexRow columnGap={1} rowGap={1} flexWrap="wrap" {...props}>
      {timestamp
        ? <Chip label={new Date(timestamp).toLocaleString()} />
        : null}
      {baseFee
        ? <Chip label={`${baseFeeLabel} - ${baseFee.toFixed(2)} GWEI`} />
        : null}
      {blockNumber
        ? <Chip label={`${blockNumberLabel} - ${blockNumber}`} />
        : null}
    </FlexRow>
  )
}
