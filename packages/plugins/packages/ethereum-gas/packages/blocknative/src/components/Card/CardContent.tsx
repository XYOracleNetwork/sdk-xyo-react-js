import type { CardContentProps } from '@mui/material'
import { CardContent, Grid } from '@mui/material'
import type { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { getBlocknativeTransformer } from '../hooks/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const BlocknativeGasPriceCardContent: React.FC<PayloadRenderProps & CardContentProps> = ({ payload, ...props }) => {
  const gasPricePayload = payload ? (payload as EthereumGasBlocknativePayload) : undefined
  const parsedPayload = getBlocknativeTransformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || !gasPricePayload?.blockPrices?.length) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent
      sx={{
        display: 'flex', flexDirection: 'column', rowGap: 4,
      }}
      {...props}
    >
      <Grid
        container
        spacing={3}
        columns={{
          lg: 15, md: 15, sm: 12, xs: 12,
        }}
      >
        {parsedPayload
          && parsedPayload?.gasPrice?.map(({ price }) => (
            <Grid key={price?.label} item xs={12} sm={6} md={5} lg={3}>
              <GasFeeCard gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
            </Grid>
          ))}
      </Grid>
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={1} />
    </CardContent>
  )
}

BlocknativeGasPriceCardContent.displayName = 'BlocknativeGasPriceCardContent'
