import type { CardHeaderProps } from '@mui/material'
import type { EthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { getEtherchainV2Transformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const EtherchainV2GasPriceCardHeader = ({ ref, payload }: PayloadRenderProps & CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const gasPricePayload = payload ? (payload as EthereumGasEtherchainV2Payload) : undefined
  const parsedPayload = getEtherchainV2Transformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
}

EtherchainV2GasPriceCardHeader.displayName = 'EtherchainV2GasPriceCardHeader'
