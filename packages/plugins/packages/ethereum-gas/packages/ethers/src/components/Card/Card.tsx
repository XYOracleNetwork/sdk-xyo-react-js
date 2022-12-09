import { Card, CardProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EthersGasPriceCardContent } from './CardContent'
import { EthersGasPriceCardHeader } from './CardHeader'

export const EthersGasPriceCard = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthersGasPriceCardHeader payload={payload} />
      <EthersGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthersGasPriceCard.displayName = 'EthersGasPriceCard'
