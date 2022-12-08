import { Card, CardProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { EtherscanGasPriceCardContent } from './CardContent'
import { EtherscanGasPriceCardHeader } from './CardHeader'

export const EtherscanGasPriceCard = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EtherscanGasPriceCardHeader payload={payload} />
      <EtherscanGasPriceCardContent payload={payload} />
    </Card>
  )
})

EtherscanGasPriceCard.displayName = 'EtherscanGasPriceCard'
