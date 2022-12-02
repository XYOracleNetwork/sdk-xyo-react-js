import { CardContent, CardContentProps, Grid } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { GasFeeCard } from '../_shared'
import { FeeDataPayload, FeePerGasValues } from '../lib'

export const EthereumGasPriceCardContent = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined
  return (
    <CardContent ref={ref} {...props}>
      <Grid container spacing={3}>
        {gasPricePayload &&
          FeePerGasValues.map((value) => (
            <Grid key={value} item xs={12} sm={6} lg={3}>
              <GasFeeCard gasPrice={gasPricePayload?.feePerGas[value]} priorityFee={gasPricePayload.priorityFeePerGas[value]} speed={value} />
            </Grid>
          ))}
      </Grid>
    </CardContent>
  )
})

EthereumGasPriceCardContent.displayName = 'EthereumGasPriceCardContent'
