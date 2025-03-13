import type { CardHeaderProps } from '@mui/material'
import type { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { getBlocknativeTransformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const BlocknativeGasPriceCardHeader: React.FC<PayloadRenderProps & CardHeaderProps> = ({ payload }) => {
  const gasPricePayload = payload ? (payload as EthereumGasBlocknativePayload) : undefined
  const parsedPayload = getBlocknativeTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
}

BlocknativeGasPriceCardHeader.displayName = 'BlocknativeGasPriceCardHeader'
