import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { EthereumGasPriceCardContent } from './CardContent.tsx'
import { EthereumGasPriceCardHeader } from './CardHeader.tsx'

export const EthereumGasPriceCard = ({
  ref, payload, ...props
}: PayloadRenderProps & CardProps) => {
  return (
    <Card ref={ref} {...props}>
      <EthereumGasPriceCardHeader payload={payload} />
      <EthereumGasPriceCardContent payload={payload} />
    </Card>
  )
}

EthereumGasPriceCard.displayName = 'EthereumGasPriceCard'
