import { Card, CardProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { FeeDataPayload } from '../lib'
import { EthereumGasPriceCardContent } from './CardContent'
import { EthereumGasPriceCardHeader } from './CardHeader'

export const EthereumGasPriceCard = forwardRef<HTMLDivElement, XyoPayloadRenderProps & CardProps>(({ payload, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <EthereumGasPriceCardHeader payload={payload} />
      <EthereumGasPriceCardContent payload={payload} />
    </Card>
  )
})

EthereumGasPriceCard.displayName = 'EthereumGasPriceCard'
