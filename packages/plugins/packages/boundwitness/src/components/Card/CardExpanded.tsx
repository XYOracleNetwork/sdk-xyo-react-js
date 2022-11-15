import { Card, CardProps } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { TableHeightProvider } from '@xyo-network/react-table'
import { forwardRef, useState } from 'react'

import { ExpandedCardContent } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'
import { BoundWitnessCardBottomNavigation } from './Navigation'

export interface BoundWitnessRendererCardExpandedProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
  visibleRows?: number
}
const BoundWitnessRendererCardExpanded = forwardRef<HTMLDivElement, BoundWitnessRendererCardExpandedProps>(
  ({ payload, active, visibleRows, ...props }, ref) => {
    const boundwitness = payload as XyoPayload<XyoBoundWitness>
    const [activeTab, setActiveTab] = useState(0)

    return (
      <Card ref={ref} {...props}>
        <BoundWitnessCardHeader payload={boundwitness} active={active} />
        <FlexGrowCol alignItems="stretch">
          <TableHeightProvider defaultVisibleRows={visibleRows}>
            <ExpandedCardContent activeTab={activeTab} boundwitness={boundwitness} />
          </TableHeightProvider>
          <BoundWitnessCardBottomNavigation boundWitness={boundwitness} activeTab={activeTab} setActiveTab={setActiveTab} />
        </FlexGrowCol>
      </Card>
    )
  },
)

BoundWitnessRendererCardExpanded.displayName = 'BoundWitnessRendererCardExpanded'

export { BoundWitnessRendererCardExpanded }
