import type { CardHeaderProps } from '@mui/material'
import type { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { useBlocknativeTransformer } from '../hooks/index.ts'
import { RenderTitle } from '../lib/index.ts'

export const BlocknativeGasPriceCardHeader = forwardRef<HTMLDivElement, PayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as EthereumGasBlocknativePayload) : undefined
  const parsedPayload = useBlocknativeTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

BlocknativeGasPriceCardHeader.displayName = 'BlocknativeGasPriceCardHeader'
