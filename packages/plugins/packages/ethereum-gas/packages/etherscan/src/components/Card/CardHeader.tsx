import { CardHeaderProps } from '@mui/material'
import { EthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { useEtherscanTransformer } from '../hooks/index.js'
import { RenderTitle } from '../lib/index.js'

export const EtherscanGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasEtherscanPayload) : undefined
  const parsedPayload = useEtherscanTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

EtherscanGasPriceCardHeader.displayName = 'EtherscanGasPriceCardHeader'
