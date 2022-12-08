import { CardContent, CardContentProps, Grid } from '@mui/material'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { FeeDataPayload, FeePerGasToSpeed, FeePerGasValues } from '../lib'

export const EthereumGasPriceCardContent = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  if ([isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent ref={ref} {...props}>
      <Grid container spacing={3}>
        {gasPricePayload &&
          FeePerGasValues.map((value) => (
            <Grid key={value} item xs={12} sm={6} lg={3}>
              <GasFeeCard
                speedPaperElevation={4}
                gasPrice={gasPricePayload?.feePerGas[value]}
                priorityFee={gasPricePayload.priorityFeePerGas[value]}
                speed={FeePerGasToSpeed[value]}
              />
            </Grid>
          ))}
      </Grid>
    </CardContent>
  )
})

EthereumGasPriceCardContent.displayName = 'EthereumGasPriceCardContent'
