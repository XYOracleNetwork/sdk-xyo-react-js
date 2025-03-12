import type { CardContentProps } from '@mui/material'
import { CardContent, Grid } from '@mui/material'
import type { EthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { getEtherchainV2Transformer } from '../hooks/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const EtherchainV2GasPriceCardContent = ({
  ref, payload, ...props
}: PayloadRenderProps & CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const gasPricePayload = payload ? (payload as EthereumGasEtherchainV2Payload) : undefined
  const parsedPayload = getEtherchainV2Transformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || !gasPricePayload?.data?.standard) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 2 }} />
  }

  return (
    <CardContent
      ref={ref}
      sx={{
        display: 'flex', flexDirection: 'column', rowGap: 4,
      }}
      {...props}
    >
      <Grid container spacing={3}>
        {parsedPayload
          && parsedPayload?.gasPrice?.map(({ price }) => (
            <Grid key={price?.label} item xs={22} sm={6} lg={3}>
              <GasFeeCard gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
            </Grid>
          ))}
      </Grid>
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={2} />
    </CardContent>
  )
}

EtherchainV2GasPriceCardContent.displayName = 'EtherchainV2GasPriceCardContent'
