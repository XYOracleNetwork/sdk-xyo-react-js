import { CardProps } from '@mui/material'

import { GasPriceWitnessUIBasePayload } from '../../types'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '../HeaderComponents'
import { StyledCardHeader } from '../layout'

export interface GasPriceCardHeaderProps extends CardProps {
  parsedPayload?: GasPriceWitnessUIBasePayload
  title?: string
}
export const GasPriceWitnessCardHeader: React.FC<GasPriceCardHeaderProps> = ({ title, parsedPayload, ...props }) => (
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
)
