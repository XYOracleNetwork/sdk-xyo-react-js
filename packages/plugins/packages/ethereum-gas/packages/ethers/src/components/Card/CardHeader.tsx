import { CardHeaderProps } from '@mui/material'
import { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { useEthersTransformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const EthersGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasEthersPayload) : undefined
  const parsedPayload = useEthersTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

EthersGasPriceCardHeader.displayName = 'EthersGasPriceCardHeader'
