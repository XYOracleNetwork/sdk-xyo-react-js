import { CardHeaderProps } from '@mui/material'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography, StyledCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { FeeDataPayload } from '../lib'

export const EthereumGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  return (
    <StyledCardHeader
      title={<GasPriceHeaderTypography heading="Gas Fee Estimate" />}
      action={
        <GasPriceHeaderActionsBox
          timestamp={gasPricePayload?.timestamp}
          baseFee={gasPricePayload?.baseFee}
          blockNumber={gasPricePayload?.blockNumber ? parseInt(gasPricePayload?.blockNumber) : undefined}
        />
      }
    />
  )
})

EthereumGasPriceCardHeader.displayName = 'EthereumGasPriceCardHeader'
