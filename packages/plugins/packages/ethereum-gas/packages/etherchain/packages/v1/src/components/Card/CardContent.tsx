import { CardContent, CardContentProps, Grid } from '@mui/material'
import { XyoEthereumGasEtherchainV1Payload } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEtherchainV1Transformer } from '../hooks'

export const EtherchainV1GasPriceCardContent = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherchainV1Payload) : undefined
  const parsedPayload = useEtherchainV1Transformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || !gasPricePayload?.standard) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent ref={ref} sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }} {...props}>
      <Grid container spacing={3}>
        {parsedPayload &&
          parsedPayload?.gasPrice?.map(({ price }) => (
            <Grid key={price?.label} item xs={12} sm={6} lg={4}>
              <GasFeeCard gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
            </Grid>
          ))}
      </Grid>
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={1} />
    </CardContent>
  )
})

EtherchainV1GasPriceCardContent.displayName = 'EtherchainV1GasPriceCardContent'
