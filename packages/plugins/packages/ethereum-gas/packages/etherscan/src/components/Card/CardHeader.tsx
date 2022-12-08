import { CardHeader, CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEtherscanTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EtherscanGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEtherscanPayload) : undefined
  const parsedPayload = useEtherscanTransformer(gasPricePayload)
  return (
    <CardHeader
      title={<GasPriceHeaderTypography heading={RenderTitle} />}
      action={
        <GasPriceHeaderActionsBox
          timestamp={parsedPayload?.timestamp}
          baseFee={parsedPayload?.baseFee?.value}
          baseFeeLabel={parsedPayload?.baseFee?.label}
          blockNumber={parsedPayload?.blockNumber?.value}
          blockNumberLabel={parsedPayload?.blockNumber?.label}
        />
      }
    />
  )
})

EtherscanGasPriceCardHeader.displayName = 'EtherscanGasPriceCardHeader'
