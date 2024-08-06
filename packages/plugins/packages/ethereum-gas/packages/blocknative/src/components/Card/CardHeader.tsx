import { CardHeaderProps } from '@mui/material'
import { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { useBlocknativeTransformer } from '../hooks/index.js'
import { RenderTitle } from '../lib/index.js'

export const BlocknativeGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasBlocknativePayload) : undefined
  const parsedPayload = useBlocknativeTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

BlocknativeGasPriceCardHeader.displayName = 'BlocknativeGasPriceCardHeader'
