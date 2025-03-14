import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { EtherscanGasPriceCardContent } from './CardContent.tsx'
import { EtherscanGasPriceCardHeader } from './CardHeader.tsx'

export const EtherscanGasPriceCard = ({
  ref, payload, ...props
}: PayloadRenderProps & CardProps) => {
  return (
    <Card ref={ref} {...props}>
      <EtherscanGasPriceCardHeader payload={payload} />
      <EtherscanGasPriceCardContent payload={payload} />
    </Card>
  )
}

EtherscanGasPriceCard.displayName = 'EtherscanGasPriceCard'
