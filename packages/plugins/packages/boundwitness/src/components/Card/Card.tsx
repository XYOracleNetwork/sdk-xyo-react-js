import { Card, CardProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { useActiveBoundWitness } from '@xyo-network/react-address'

import { BoundWitnessCardContent } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'

export interface BoundWitnessCardProps extends CardProps {
  payload?: XyoPayload
}
export const BoundWitnessRendererCard: React.FC<BoundWitnessCardProps> = ({ payload, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const { activeBoundWitness } = useActiveBoundWitness(false)

  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={payload !== undefined ? activeBoundWitness === payload : undefined} />
      <BoundWitnessCardContent payload={boundwitness} />
    </Card>
  )
}
