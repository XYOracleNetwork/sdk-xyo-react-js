import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { EtherscanGasPriceCardContent } from './CardContent.tsx'
import { EtherscanGasPriceCardHeader } from './CardHeader.tsx'

export const EtherscanGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherscanGasPriceCardHeader payload={payload} />
      <EtherscanGasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherscanGasPriceCard.displayName = 'EtherscanGasPriceCard'
