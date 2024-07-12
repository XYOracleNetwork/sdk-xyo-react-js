import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import { TableHeightState } from '@xyo-network/react-table'
import { forwardRef } from 'react'

import { useActiveBoundWitness } from '../../../hooks/index.js'
import { NoBlockSelectedBox } from './NoBlockSelectedBox.js'

export interface ActiveBWFlexBoxProps extends FlexBoxProps {
  visibleRows?: TableHeightState['visibleRows']
}

const ActiveBWFlexBox = forwardRef<HTMLDivElement, ActiveBWFlexBoxProps>(({ visibleRows, ...props }, ref) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol alignItems="stretch" justifyContent={activeBoundWitness ? 'start' : 'center'} ref={ref} {...props}>
      {activeBoundWitness ?
        <BoundWitnessDetailsCard visibleRows={visibleRows} payload={activeBoundWitness} />
      : <NoBlockSelectedBox />}
    </FlexGrowCol>
  )
})

ActiveBWFlexBox.displayName = 'ActiveBWFlexBox'

export { ActiveBWFlexBox }
