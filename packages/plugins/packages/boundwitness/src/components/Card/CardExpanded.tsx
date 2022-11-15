import { Card, CardProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

import { BoundWitnessCardContentWithNavigation, CardColumnTitleH2 } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'

export interface BoundWitnessRendererCardExpandedProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
}
export const BoundWitnessRendererCardExpanded: React.FC<BoundWitnessRendererCardExpandedProps> = ({ payload, active, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>

  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} />
      <BoundWitnessCardContentWithNavigation>
        <CardColumnTitleH2>Payloads</CardColumnTitleH2>
      </BoundWitnessCardContentWithNavigation>
    </Card>
  )
}
