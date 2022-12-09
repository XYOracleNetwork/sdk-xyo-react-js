import { CardProps } from '@mui/material'
import { forwardRef } from 'react'

import { GasPriceWitnessUIBasePayload } from '../../types'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '../HeaderComponents'
import { StyledCardHeader } from '../layout'

export interface GasPriceCardHeaderProps extends CardProps {
  parsedPayload?: GasPriceWitnessUIBasePayload
  title?: string
}
export const GasPriceWitnessCardHeader = forwardRef<HTMLDivElement, GasPriceCardHeaderProps>(({ title, parsedPayload, ...props }, ref) => (
  <StyledCardHeader
    title={<GasPriceHeaderTypography heading={title} />}
    action={
      <GasPriceHeaderActionsBox
        timestamp={parsedPayload?.timestamp}
        baseFee={parsedPayload?.baseFee?.value}
        baseFeeLabel={parsedPayload?.baseFee?.label}
        blockNumber={parsedPayload?.blockNumber?.value}
        blockNumberLabel={parsedPayload?.blockNumber?.label}
      />
    }
    {...props}
  />
))

GasPriceWitnessCardHeader.displayName = 'GasPriceWitnessCardHeader'
