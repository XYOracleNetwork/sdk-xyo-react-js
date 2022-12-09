import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEtherscanTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EtherscanGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherscanPayload) : undefined
  const parsedPayload = useEtherscanTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
})

EtherscanGasPriceCardHeader.displayName = 'EtherscanGasPriceCardHeader'
