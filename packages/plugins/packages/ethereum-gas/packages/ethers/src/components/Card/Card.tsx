import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { EthersGasPriceCardContent } from './CardContent.tsx'
import { EthersGasPriceCardHeader } from './CardHeader.tsx'

export const EthersGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthersGasPriceCardHeader payload={payload} />
      <EthersGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthersGasPriceCard.displayName = 'EthersGasPriceCard'
