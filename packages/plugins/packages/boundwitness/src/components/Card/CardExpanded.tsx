import { Card, CardContent, CardProps } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { forwardRef } from 'react'

import { CardColumnTitleH2 } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'
import { BoundWitnessCardBottomNavigation } from './Navigation'

export interface BoundWitnessRendererCardExpandedProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
}
const BoundWitnessRendererCardExpanded = forwardRef<HTMLDivElement, BoundWitnessRendererCardExpandedProps>(({ payload, active, ...props }, ref) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>

  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} />
      <FlexGrowCol alignItems="stretch">
        <CardContent>
          <CardColumnTitleH2>Payloads</CardColumnTitleH2>
        </CardContent>
        <BoundWitnessCardBottomNavigation boundWitness={boundwitness} />
      </FlexGrowCol>
    </Card>
  )
})

BoundWitnessRendererCardExpanded.displayName = 'BoundWitnessRendererCardExpanded'

export { BoundWitnessRendererCardExpanded }
