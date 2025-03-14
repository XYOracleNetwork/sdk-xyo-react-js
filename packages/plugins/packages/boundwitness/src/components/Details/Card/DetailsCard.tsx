import type { CardProps } from '@mui/material'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider } from '@xyo-network/react-table'
import React from 'react'

import { BoundWitnessDetailsCardInner } from './DetailsCardInner.tsx'

const BoundWitnessDetailsCard = ({
  ref, visibleRows, ...props
}: PayloadDetailsListRenderProps & CardProps) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
}

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }
