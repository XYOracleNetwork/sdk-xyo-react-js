import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useBlocknativeTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const BlocknativeGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }, ref) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasBlocknativePayload) : undefined
  const parsedPayload = useBlocknativeTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} ref={ref} />
})

BlocknativeGasPriceCardHeader.displayName = 'BlocknativeGasPriceCardHeader'
