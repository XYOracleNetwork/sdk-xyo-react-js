import type { CardHeaderProps } from '@mui/material'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import type { FeeDataPayload } from '../lib/index.ts'

export const EthereumGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  return (
    <StyledCardHeader
      title={<GasPriceHeaderTypography heading="Gas Fee Estimate" />}
      action={(
        <GasPriceHeaderActionsBox
          timestamp={gasPricePayload?.timestamp}
          baseFee={gasPricePayload?.baseFee}
          blockNumber={gasPricePayload?.blockNumber ? Number.parseInt(gasPricePayload?.blockNumber) : undefined}
        />
      )}
      ref={ref}
    />
  )
})

EthereumGasPriceCardHeader.displayName = 'EthereumGasPriceCardHeader'
