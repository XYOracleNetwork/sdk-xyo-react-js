import { Card, CardProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

import { BoundWitnessCardContent } from './CardContent'
import { BoundWitnessCardHeader } from './Header'

export interface BoundWitnessCardProps extends CardProps {
  payload?: XyoPayload
}
export const BoundWitnessRendererCard: React.FC<BoundWitnessCardProps> = ({ payload, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} />
      <BoundWitnessCardContent payload={boundwitness} />
    </Card>
  )
}
