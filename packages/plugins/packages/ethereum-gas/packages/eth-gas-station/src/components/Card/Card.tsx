import { Card, CardProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EthgasstationGasPriceCardContent } from './CardContent'
import { EthgasstationGasPriceCardHeader } from './CardHeader'

export const EthgasstationGasPriceCard = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthgasstationGasPriceCardHeader payload={payload} />
      <EthgasstationGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthgasstationGasPriceCard.displayName = 'EthgasstationGasPriceCard'
