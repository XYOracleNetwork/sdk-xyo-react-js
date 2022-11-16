import { Card, CardProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'

import { BoundWitnessCardHeader } from '../_shared'
import { BoundWitnessCardContent } from './CardContent'

export interface BoundWitnessCardProps extends CardProps {
  payload?: XyoPayload
  active?: boolean
}
export const BoundWitnessRendererCard: React.FC<BoundWitnessCardProps> = ({ payload, active, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>

  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} />
      <BoundWitnessCardContent payload={boundwitness} active={active} />
    </Card>
  )
}
