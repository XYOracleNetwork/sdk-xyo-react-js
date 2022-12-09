import { Card, CardProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EtherchainV2GasPriceCardContent } from './CardContent'
import { EtherchainV2GasPriceCardHeader } from './CardHeader'

export const EtherchainV2GasPriceCard = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherchainV2GasPriceCardHeader payload={payload} />
      <EtherchainV2GasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherchainV2GasPriceCard.displayName = 'EtherchainV2GasPriceCard'
