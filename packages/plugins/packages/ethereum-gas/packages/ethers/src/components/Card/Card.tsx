import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { EthersGasPriceCardContent } from './CardContent.tsx'
import { EthersGasPriceCardHeader } from './CardHeader.tsx'

export const EthersGasPriceCard = ({
  ref, payload, ...props
}: PayloadRenderProps & CardProps) => {
  return (
    <Card ref={ref} {...props}>
      <EthersGasPriceCardHeader payload={payload} />
      <EthersGasPriceCardContent payload={payload} />
    </Card>
  )
}

EthersGasPriceCard.displayName = 'EthersGasPriceCard'
