import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EtherchainV1GasPriceCardContent } from './CardContent'
import { EtherchainV1GasPriceCardHeader } from './CardHeader'

export const EtherchainV1GasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherchainV1GasPriceCardHeader payload={payload} />
      <EtherchainV1GasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherchainV1GasPriceCard.displayName = 'EtherchainV1GasPriceCard'
