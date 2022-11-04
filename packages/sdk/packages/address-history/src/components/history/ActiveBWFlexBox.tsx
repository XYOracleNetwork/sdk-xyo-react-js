import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol } from '@xylabs/sdk-react'
import { BoundWitnessDetails } from '@xyo-network/react-boundwitness-plugin'

import { useActiveBoundWitness } from '../../contexts'

export const ActiveBWFlexBox: React.FC<FlexBoxProps> = ({ ...props }) => {
  const { activeBoundWitness } = useActiveBoundWitness(false)
  return (
    <FlexGrowCol overflow="scroll" justifyContent={activeBoundWitness ? 'start' : 'center'} {...props}>
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
}
