import { Card } from '@mui/material'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { forwardRef } from 'react'

import { BoundWitnessCardHeader } from '../../Card'
import { BoundWitnessDetailsBox } from '../Box'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ payload, visibleRows, active, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <BoundWitnessCardHeader payload={payload} active={active} />
      <BoundWitnessDetailsBox payload={payload} visibleRows={visibleRows} />
    </Card>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }
