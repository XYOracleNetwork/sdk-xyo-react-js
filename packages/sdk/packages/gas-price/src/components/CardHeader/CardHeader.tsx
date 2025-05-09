import type { CardProps } from '@mui/material'
import React from 'react'

import type { GasPriceWitnessUIBasePayload } from '../../types/index.ts'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '../HeaderComponents/index.ts'
import { StyledCardHeader } from '../layout/index.ts'

export interface GasPriceCardHeaderProps extends CardProps {
  parsedPayload?: GasPriceWitnessUIBasePayload
  title?: string
}
export const GasPriceWitnessCardHeader = ({
  ref, title, parsedPayload, ...props
}: GasPriceCardHeaderProps) => (
  <StyledCardHeader
    title={<GasPriceHeaderTypography heading={title} />}
    action={(
      <GasPriceHeaderActionsBox
        timestamp={parsedPayload?.timestamp}
        baseFee={parsedPayload?.baseFee?.value}
        baseFeeLabel={parsedPayload?.baseFee?.label}
        blockNumber={parsedPayload?.blockNumber?.value}
        blockNumberLabel={parsedPayload?.blockNumber?.label}
      />
    )}
    ref={ref}
    {...props}
  />
)

GasPriceWitnessCardHeader.displayName = 'GasPriceWitnessCardHeader'
