import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EtherchainV2GasPriceCardContent } from './CardContent.js'
import { EtherchainV2GasPriceCardHeader } from './CardHeader.js'

export const EtherchainV2GasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherchainV2GasPriceCardHeader payload={payload} />
      <EtherchainV2GasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherchainV2GasPriceCard.displayName = 'EtherchainV2GasPriceCard'
