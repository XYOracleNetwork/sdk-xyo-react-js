import { CardHeaderProps } from '@mui/material'
import { EthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEtherchainV2Transformer } from '../hooks/index.js'
import { RenderTitle } from '../lib/index.js'

export const EtherchainV2GasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasEtherchainV2Payload) : undefined
  const parsedPayload = useEtherchainV2Transformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

EtherchainV2GasPriceCardHeader.displayName = 'EtherchainV2GasPriceCardHeader'
