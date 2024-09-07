import type { CardProps } from '@mui/material'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider } from '@xyo-network/react-table'
import React, { forwardRef } from 'react'

import { BoundWitnessDetailsCardInner } from './DetailsCardInner.tsx'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, PayloadDetailsListRenderProps & CardProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }
