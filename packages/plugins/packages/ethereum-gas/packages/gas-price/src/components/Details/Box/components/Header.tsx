import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledGasPriceHeaderBox } from '@xyo-network/react-gas-price'
import React from 'react'

import { DescriptionQuickTip } from './DescriptionQuickTip.tsx'

export interface GasPriceHeaderBoxProps extends FlexBoxProps {
  baseFee?: number
  heading?: string
  timestamp?: number
}

export const GasPriceHeaderBox: React.FC<GasPriceHeaderBoxProps> = ({ timestamp, baseFee, heading, ...props }) => {
  return (
    <StyledGasPriceHeaderBox {...props}>
      <GasPriceHeaderTypography heading={heading}>
        <DescriptionQuickTip />
      </GasPriceHeaderTypography>
      <GasPriceHeaderActionsBox timestamp={timestamp} baseFee={baseFee} />
    </StyledGasPriceHeaderBox>
  )
}
