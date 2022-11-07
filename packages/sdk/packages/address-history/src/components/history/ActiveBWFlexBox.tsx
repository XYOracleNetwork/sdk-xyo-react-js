import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetails } from '@xyo-network/react-boundwitness-plugin'
import { forwardRef } from 'react'

import { useActiveBoundWitness } from '../../contexts'

export const ActiveBWFlexBoxWithRef: React.FC<FlexBoxProps> = forwardRef(({ ...props }, ref) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol overflow="scroll" justifyContent={activeBoundWitness ? 'start' : 'center'} ref={ref} {...props}>
      {activeBoundWitness ? (
        <BoundWitnessDetails width="100%" pt={3} paddingX={3} payload={activeBoundWitness} />
      ) : (
        <FlexCol justifyContent="center">
          <Typography variant="h2">No Block Selected</Typography>
          <Typography variant="subtitle1">Select a block to see details like address, signatures, and payload schemas</Typography>
        </FlexCol>
      )}
    </FlexGrowCol>
  )
})

ActiveBWFlexBoxWithRef.displayName = 'ActiveBWFlexBox'
export const ActiveBWFlexBox = ActiveBWFlexBoxWithRef
