import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { EthgasstationGasPriceCardContent } from './CardContent.tsx'
import { EthgasstationGasPriceCardHeader } from './CardHeader.tsx'

export const EthgasstationGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthgasstationGasPriceCardHeader payload={payload} />
      <EthgasstationGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthgasstationGasPriceCard.displayName = 'EthgasstationGasPriceCard'
