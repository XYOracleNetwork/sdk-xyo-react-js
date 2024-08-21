import type { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'

import type { GasPriceWitnessUIBasePayload } from '../types/index.ts'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from './HeaderComponents/index.ts'
import { StyledGasPriceHeaderBox } from './layout/index.ts'

export interface GasPriceWitnessHeaderBoxProps extends FlexBoxProps {
  heading?: string
  parsedPayload?: GasPriceWitnessUIBasePayload
}

export const GasPriceWitnessHeaderBox: React.FC<GasPriceWitnessHeaderBoxProps> = ({
  heading, parsedPayload, ...props
}) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading} />
      <GasPriceHeaderActionsBox
        timestamp={parsedPayload?.timestamp}
        baseFee={parsedPayload?.baseFee?.value}
        baseFeeLabel={parsedPayload?.baseFee?.label}
        blockNumber={parsedPayload?.blockNumber?.value}
        blockNumberLabel={parsedPayload?.blockNumber?.label}
      />
    </StyledGasPriceHeaderBox>
  )
}
