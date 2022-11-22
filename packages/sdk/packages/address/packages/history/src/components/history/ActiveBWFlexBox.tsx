import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import { TableHeightState } from '@xyo-network/react-table'
import { forwardRef } from 'react'

import { useActiveBoundWitness } from '../../contexts'

interface ActiveBWFlexBoxProps extends FlexBoxProps {
  visibleRows?: TableHeightState['visibleRows']
}

const ActiveBWFlexBox = forwardRef<HTMLDivElement, ActiveBWFlexBoxProps>(({ visibleRows = 3, ...props }, ref) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol alignItems="stretch" justifyContent={activeBoundWitness ? 'start' : 'center'} ref={ref} {...props}>
      {activeBoundWitness ? (
        <BoundWitnessDetailsCard visibleRows={visibleRows} payload={activeBoundWitness} />
      ) : (
        <FlexCol justifyContent="center">
          <Typography variant="h2">No Block Selected</Typography>
          <Typography variant="subtitle1">Select a block to see details like address, signatures, and payload schemas</Typography>
        </FlexCol>
      )}
    </FlexGrowCol>
  )
})

ActiveBWFlexBox.displayName = 'ActiveBWFlexBox'

export { ActiveBWFlexBox }
