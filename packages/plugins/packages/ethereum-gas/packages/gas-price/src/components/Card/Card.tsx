import { Card, CardProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EthereumGasPriceCardContent } from './CardContent'
import { EthereumGasPriceCardHeader } from './CardHeader'

export const EthereumGasPriceCard = forwardRef<HTMLDivElement, PayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthereumGasPriceCardHeader payload={payload} />
      <EthereumGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthereumGasPriceCard.displayName = 'EthereumGasPriceCard'
