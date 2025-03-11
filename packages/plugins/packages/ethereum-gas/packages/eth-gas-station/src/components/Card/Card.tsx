import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { EthgasstationGasPriceCardContent } from './CardContent.tsx'
import { EthgasstationGasPriceCardHeader } from './CardHeader.tsx'

export const EthgasstationGasPriceCard = ({
  ref, payload, ...props
}: PayloadRenderProps & CardProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Card ref={ref} {...props}>
      <EthgasstationGasPriceCardHeader payload={payload} />
      <EthgasstationGasPriceCardContent payload={payload} />
    </Card>
  )
}

EthgasstationGasPriceCard.displayName = 'EthgasstationGasPriceCard'
