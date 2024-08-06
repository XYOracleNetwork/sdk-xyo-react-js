import { CardContent, CardContentProps } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

import { useEthersTransformer } from '../hooks/index.js'

export const EthersGasPriceCardContent = forwardRef<HTMLDivElement, PayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasEthersPayload) : undefined
  const parsedPayload = useEthersTransformer(gasPricePayload)

  if (isEmpty(gasPricePayload) || !gasPricePayload.gasPrice) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." sx={{ m: 1 }} />
  }

  return (
    <CardContent ref={ref} sx={{ alignItems: 'start', display: 'flex', flexDirection: 'column', rowGap: 4 }} {...props}>
      {parsedPayload
      && parsedPayload?.gasPrice?.map(({ price }) => (
        <GasFeeCard key={price?.label} gasPrice={price?.value} speed={price?.label} speedPaperElevation={4} />
      ))}
      <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" pr={1} />
    </CardContent>
  )
})

EthersGasPriceCardContent.displayName = 'EthersGasPriceCardContent'
