import { CardContent, CardContentProps, Grid } from '@mui/material'
import { XyoEthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEtherchainV2Transformer } from '../hooks'

export const EtherchainV2GasPriceCardContent = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherchainV2Payload) : undefined
  const parsedPayload = useEtherchainV2Transformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || !gasPricePayload?.data?.standard) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 2 }} />
  }

  return (
    <CardContent ref={ref} sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }} {...props}>
      <Grid container spacing={3}>
        {parsedPayload &&
          parsedPayload?.gasPrice?.map(({ price }) => (
            <Grid key={price?.label} item xs={22} sm={6} lg={3}>
              <GasFeeCard gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
            </Grid>
          ))}
      </Grid>
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={2} />
    </CardContent>
  )
})

EtherchainV2GasPriceCardContent.displayName = 'EtherchainV2GasPriceCardContent'
