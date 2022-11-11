import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetails } from '@xyo-network/react-boundwitness-plugin'
import { forwardRef } from 'react'

import { useActiveBoundWitness } from '../../contexts'

const ActiveBWFlexBox = forwardRef<HTMLDivElement, FlexBoxProps>(({ ...props }, ref) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol alignItems="stretch" justifyContent={activeBoundWitness ? 'start' : 'center'} ref={ref} {...props}>
      {activeBoundWitness ? (
        <BoundWitnessDetails payload={activeBoundWitness} />
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
