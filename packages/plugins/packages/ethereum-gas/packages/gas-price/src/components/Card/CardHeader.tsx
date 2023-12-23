import { CardHeaderProps } from '@mui/material'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledCardHeader } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { FeeDataPayload } from '../lib'

export const EthereumGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  return (
    <StyledCardHeader
      title={<GasPriceHeaderTypography heading="Gas Fee Estimate" />}
      action={
        <GasPriceHeaderActionsBox
          timestamp={gasPricePayload?.timestamp}
          baseFee={gasPricePayload?.baseFee}
          blockNumber={gasPricePayload?.blockNumber ? Number.parseInt(gasPricePayload?.blockNumber) : undefined}
        />
      }
      ref={ref}
    />
  )
})

EthereumGasPriceCardHeader.displayName = 'EthereumGasPriceCardHeader'
