import { CardHeader, CardHeaderProps } from '@mui/material'
import { XyoEthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasPriceHeaderActionsBox, GasPriceHeaderTypography } from '@xyo-network/react-gas-price'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { useEthersTransformer } from '../hooks'
import { RenderTitle } from '../lib'

export const EthersGasPriceCardHeader = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardHeaderProps>(({ payload }) => {
  const gasPricePayload = payload ? (payload as XyoEthereumGasEthersPayload) : undefined
  const parsedPayload = useEthersTransformer(gasPricePayload)
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

EthersGasPriceCardHeader.displayName = 'EthersGasPriceCardHeader'
