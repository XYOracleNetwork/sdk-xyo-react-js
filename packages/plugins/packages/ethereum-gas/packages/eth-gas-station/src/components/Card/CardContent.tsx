import { CardContent, CardContentProps, Grid } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { EthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { useEthgasstationTransformer } from '../hooks/index.js'

export const EthgasstationGasPriceCardContent = forwardRef<HTMLDivElement, PayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasEthgasstationPayload) : undefined
  const parsedPayload = useEthgasstationTransformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || isEmpty(gasPricePayload?.gasPrice)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent ref={ref} sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }} {...props}>
      <Grid container spacing={3}>
        {parsedPayload
        && parsedPayload?.gasPrice?.map(({ price }) => (
          <Grid key={price?.label} item xs={12} sm={6} lg={4}>
            <GasFeeCard gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
          </Grid>
        ))}
      </Grid>
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={1} />
    </CardContent>
  )
})

EthgasstationGasPriceCardContent.displayName = 'EthgasstationGasPriceCardContent'
