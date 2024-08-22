import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import type { TableHeightState } from '@xyo-network/react-table'
import React, { forwardRef } from 'react'

import { useActiveBoundWitness } from '../../../hooks/index.ts'
import { NoBlockSelectedBox } from './NoBlockSelectedBox.tsx'

export interface ActiveBWFlexBoxProps extends FlexBoxProps {
  visibleRows?: TableHeightState['visibleRows']
}

const ActiveBWFlexBox = forwardRef<HTMLDivElement, ActiveBWFlexBoxProps>(({ visibleRows, ...props }, ref) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol alignItems="stretch" justifyContent={activeBoundWitness ? 'start' : 'center'} ref={ref} {...props}>
      {activeBoundWitness
        ? <BoundWitnessDetailsCard visibleRows={visibleRows} payload={activeBoundWitness} />
        : <NoBlockSelectedBox />}
    </FlexGrowCol>
  )
})

ActiveBWFlexBox.displayName = 'ActiveBWFlexBox'

export { ActiveBWFlexBox }
