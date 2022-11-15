import { Card, CardProps } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { CardContentEx } from '@xyo-network/react-card'
import { forwardRef, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../_shared'
import { BoundWitnessCardHeader } from './CardHeader'
import { BoundWitnessCardBottomNavigation } from './Navigation'

export interface BoundWitnessRendererCardExpandedProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
}
const BoundWitnessRendererCardExpanded = forwardRef<HTMLDivElement, BoundWitnessRendererCardExpandedProps>(({ payload, active, ...props }, ref) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const [activeTab, setActiveTab] = useState(0)
  const noOpFooterProp = { PayloadTableFooterComponent: () => <></> }
  return (
    <Card ref={ref} {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} />
      <FlexGrowCol alignItems="stretch">
        <CardContentEx removePadding variant="scrollable">
          {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} {...noOpFooterProp} /> : null}
          {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} {...noOpFooterProp} /> : null}
          {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} /> : null}
        </CardContentEx>
        <BoundWitnessCardBottomNavigation boundWitness={boundwitness} activeTab={activeTab} setActiveTab={setActiveTab} />
      </FlexGrowCol>
    </Card>
  )
})

BoundWitnessRendererCardExpanded.displayName = 'BoundWitnessRendererCardExpanded'

export { BoundWitnessRendererCardExpanded }
