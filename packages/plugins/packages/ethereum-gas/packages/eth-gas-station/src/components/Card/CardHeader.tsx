import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEthgasstationTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EthgasstationGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEthgasstationPayload) : undefined
  const parsedPayload = useEthgasstationTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
})

EthgasstationGasPriceCardHeader.displayName = 'EthgasstationGasPriceCardHeader'
