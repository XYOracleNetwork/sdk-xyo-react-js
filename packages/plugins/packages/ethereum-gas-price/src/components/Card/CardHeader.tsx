import { CardHeader, CardHeaderProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { GasPriceEstimateHeadingTypography, GasPriceHeaderActionsBox } from '../_shared'
import { FeeDataPayload } from '../lib'

export const EthereumGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined
  return (
    <CardHeader
      title={<GasPriceEstimateHeadingTypography />}
      action={<GasPriceHeaderActionsBox timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />}
    />
  )
})

EthereumGasPriceCardHeader.displayName = 'EthereumGasPriceCardHeader'
