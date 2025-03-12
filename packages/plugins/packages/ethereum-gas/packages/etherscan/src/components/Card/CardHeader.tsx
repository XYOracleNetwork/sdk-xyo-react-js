import type { CardHeaderProps } from '@mui/material'
import type { EthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { getEtherscanTransformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const EtherscanGasPriceCardHeader = ({ ref, payload }: PayloadRenderProps & CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const gasPricePayload = payload ? (payload as EthereumGasEtherscanPayload) : undefined
  const parsedPayload = getEtherscanTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
}

EtherscanGasPriceCardHeader.displayName = 'EtherscanGasPriceCardHeader'
