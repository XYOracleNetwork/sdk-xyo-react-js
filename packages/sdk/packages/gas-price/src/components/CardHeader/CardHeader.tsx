import { CardProps } from '@mui/material'
import { forwardRef } from 'react'

import { GasPriceWitnessUIBasePayload } from '../../types/index.js'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '../HeaderComponents/index.js'
import { StyledCardHeader } from '../layout/index.js'

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
    ref={ref}
    {...props}
  />
))

GasPriceWitnessCardHeader.displayName = 'GasPriceWitnessCardHeader'
