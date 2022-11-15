import { Card, CardContent, CardProps } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { forwardRef, useState } from 'react'

import { CardColumnTitleH2 } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'
import { BoundWitnessCardBottomNavigation } from './Navigation'

export interface BoundWitnessRendererCardExpandedProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
}
const BoundWitnessRendererCardExpanded = forwardRef<HTMLDivElement, BoundWitnessRendererCardExpandedProps>(({ payload, active, ...props }, ref) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Card ref={ref} {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} />
      <FlexGrowCol alignItems="stretch">
        <CardContent>
          {activeTab === 0 ? <CardColumnTitleH2>Payloads</CardColumnTitleH2> : null}
          {activeTab === 1 ? <CardColumnTitleH2>Bound Witnesses</CardColumnTitleH2> : null}
          {activeTab === 2 ? <CardColumnTitleH2>Signatures</CardColumnTitleH2> : null}
        </CardContent>
        <BoundWitnessCardBottomNavigation boundWitness={boundwitness} activeTab={activeTab} setActiveTab={setActiveTab} />
      </FlexGrowCol>
    </Card>
  )
})

BoundWitnessRendererCardExpanded.displayName = 'BoundWitnessRendererCardExpanded'

export { BoundWitnessRendererCardExpanded }
