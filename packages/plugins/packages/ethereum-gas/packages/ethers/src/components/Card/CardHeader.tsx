import { CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasPriceWitnessCardHeader } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEthersTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EthersGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEthersPayload) : undefined
  const parsedPayload = useEthersTransformer(gasPricePayload)
  return <GasPriceWitnessCardHeader title={RenderTitle} parsedPayload={parsedPayload} />
})

EthersGasPriceCardHeader.displayName = 'EthersGasPriceCardHeader'
