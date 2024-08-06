import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { EthereumGasPriceCardContent } from './CardContent.tsx'
import { EthereumGasPriceCardHeader } from './CardHeader.tsx'

export const EthereumGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthereumGasPriceCardHeader payload={payload} />
      <EthereumGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthereumGasPriceCard.displayName = 'EthereumGasPriceCard'
