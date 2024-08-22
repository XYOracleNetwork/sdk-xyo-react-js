import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { EtherchainV2GasPriceCardContent } from './CardContent.tsx'
import { EtherchainV2GasPriceCardHeader } from './CardHeader.tsx'

export const EtherchainV2GasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherchainV2GasPriceCardHeader payload={payload} />
      <EtherchainV2GasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherchainV2GasPriceCard.displayName = 'EtherchainV2GasPriceCard'
