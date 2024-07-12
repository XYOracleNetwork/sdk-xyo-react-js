import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EthersGasPriceCardContent } from './CardContent.js'
import { EthersGasPriceCardHeader } from './CardHeader.js'

export const EthersGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthersGasPriceCardHeader payload={payload} />
      <EthersGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthersGasPriceCard.displayName = 'EthersGasPriceCard'
