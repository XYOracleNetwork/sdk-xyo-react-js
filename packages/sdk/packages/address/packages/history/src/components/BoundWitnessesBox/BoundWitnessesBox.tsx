import { LinearProgress, Slide } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { useXyoEvent } from '@xyo-network/react-event'
import { forwardRef } from 'react'

import { useActiveBoundWitness, useNestedBoundWitnesses } from '../../contexts'
import { ActiveBWFlexBox } from './ActiveBoundWitness'
import { useBoundWitnessClickHandler } from './hooks'
import { NestedBoundWitnessesBox } from './NestedBoundWitnesses'

export const BoundWitnessesBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const { activeBoundWitness, activeBoundWitnessHash } = useActiveBoundWitness()
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const { loading } = useNestedBoundWitnesses()

  const [activeBWref] = useXyoEvent<HTMLDivElement>((noun, _verb, data) => boundwitnessClick(noun, data, 'activeBoundWitness'))

  return (
    <>
      <FlexGrowCol
        overflow="scroll"
        alignItems="stretch"
        pt={3}
        px={3}
        rowGap={3}
        justifyContent={activeBoundWitnessHash ? 'start' : 'center'}
        ref={ref}
        {...props}
      >
        {loading ? <LinearProgress sx={{ minHeight: '10px' }} /> : null}
        <NestedBoundWitnessesBox />
        {!activeBoundWitness ? <ActiveBWFlexBox /> : null}
        <Slide direction="down" in={!!activeBoundWitness}>
          <ActiveBWFlexBox ref={activeBWref} />
        </Slide>
      </FlexGrowCol>
    </>
  )
})

BoundWitnessesBox.displayName = 'BoundWitnessesBox'
