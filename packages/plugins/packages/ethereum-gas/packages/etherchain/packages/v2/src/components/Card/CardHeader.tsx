import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEtherchainV2Transformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EtherchainV2GasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherchainV2Payload) : undefined
  const parsedPayload = useEtherchainV2Transformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

EtherchainV2GasPriceCardHeader.displayName = 'EtherchainV2GasPriceCardHeader'
