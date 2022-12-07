import { CardHeader, CardHeaderProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { GasPriceEstimateHeaderTypography, GasPriceHeaderActionsBox } from '../_shared'
import { FeeDataPayload } from '../lib'

export const EthereumGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined
  return (
    <CardHeader
      title={<GasPriceEstimateHeaderTypography heading="Gas Fee Estimate" />}
      action={<GasPriceHeaderActionsBox timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />}
    />
  )
})

EthereumGasPriceCardHeader.displayName = 'EthereumGasPriceCardHeader'
