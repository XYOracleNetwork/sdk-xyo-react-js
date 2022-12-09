import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEtherchainV1Payload } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEtherchainV1Transformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EtherchainV1GasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherchainV1Payload) : undefined
  const parsedPayload = useEtherchainV1Transformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
})

EtherchainV1GasPriceCardHeader.displayName = 'EtherchainV1GasPriceCardHeader'
