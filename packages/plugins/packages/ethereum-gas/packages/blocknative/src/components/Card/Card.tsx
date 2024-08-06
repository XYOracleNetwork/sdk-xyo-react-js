import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { BlocknativeGasPriceCardContent } from './CardContent.tsx'
import { BlocknativeGasPriceCardHeader } from './CardHeader.tsx'

export const BlocknativeGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <BlocknativeGasPriceCardHeader payload={payload} />
      <BlocknativeGasPriceCardContent payload={payload} />
    </Card>
  )
})

BlocknativeGasPriceCard.displayName = 'BlocknativeGasPriceCard'
