import { Card, CardProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

import { BoundWitnessCardContent } from './CardContent'
import { BoundWitnessCardHeader } from './Header'

export interface BoundWitnessCardProps extends CardProps {
  boundwitness?: XyoPayload<XyoBoundWitness>
}
export const BoundWitnessRendererCard: React.FC<BoundWitnessCardProps> = ({ boundwitness, ...props }) => {
  return (
    <Card {...props}>
      <BoundWitnessCardHeader boundwitness={boundwitness} />
      <BoundWitnessCardContent boundwitness={boundwitness} />
    </Card>
  )
}
