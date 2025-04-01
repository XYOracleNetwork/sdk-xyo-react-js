import type { CardContentProps } from '@mui/material'
import { CardContent, Grid } from '@mui/material'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import type { FeeDataPayload } from '../lib/index.ts'
import { FeePerGasToSpeed, FeePerGasValues } from '../lib/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const EthereumGasPriceCardContent: React.FC<PayloadRenderProps & CardContentProps> = ({ payload, ...props }) => {
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  if ([isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent {...props}>
      <Grid container spacing={3}>
        {gasPricePayload
          && FeePerGasValues.map(value => (
            <Grid
              key={value}
              size={{
                xs: 12, sm: 6, lg: 3,
              }}
            >
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
}

EthereumGasPriceCardContent.displayName = 'EthereumGasPriceCardContent'
