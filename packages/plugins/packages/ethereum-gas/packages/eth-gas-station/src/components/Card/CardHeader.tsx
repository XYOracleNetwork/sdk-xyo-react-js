import type { CardHeaderProps } from '@mui/material'
import type { EthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { getEthgasstationTransformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const EthgasstationGasPriceCardHeader: React.FC<PayloadRenderProps & CardHeaderProps> = ({ payload }) => {
  const gasPricePayload = payload ? (payload as EthereumGasEthgasstationPayload) : undefined
  const parsedPayload = getEthgasstationTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
}

EthgasstationGasPriceCardHeader.displayName = 'EthgasstationGasPriceCardHeader'
