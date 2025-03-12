import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

import { BlocknativeGasPriceCardContent } from './CardContent.tsx'
import { BlocknativeGasPriceCardHeader } from './CardHeader.tsx'

export const BlocknativeGasPriceCard = ({
  ref, payload, ...props
}: PayloadRenderProps & CardProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Card ref={ref} {...props}>
      <BlocknativeGasPriceCardHeader payload={payload} />
      <BlocknativeGasPriceCardContent payload={payload} />
    </Card>
  )
}

BlocknativeGasPriceCard.displayName = 'BlocknativeGasPriceCard'
