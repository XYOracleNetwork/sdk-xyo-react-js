import { LinearProgress, Slide } from '@mui/material'
import { Hash } from '@xylabs/hex'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { ThrownErrorBoundary, useRollbar } from '@xyo-network/react-error'
import { EventNoun, EventVerb, useEvent } from '@xyo-network/react-event'
import { forwardRef } from 'react'

import { useActiveBoundWitness, useNestedBoundWitnesses } from '../../hooks/index.js'
import { ActiveBWFlexBox } from './ActiveBoundWitness/index.js'
import { BWErrorAlert } from './Errors/index.js'
import { useBoundWitnessClickHandler } from './hooks/index.js'
import { NestedBoundWitnessesBox } from './NestedBoundWitnesses/index.js'

export const BoundWitnessesBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const { activeBoundWitness, activeBoundWitnessHash } = useActiveBoundWitness(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const { rollbar } = useRollbar()
  const { loading } = useNestedBoundWitnesses(false)

  const [activeBWref] = useEvent<HTMLDivElement, EventNoun, EventVerb, Hash>((noun, _verb, data) =>
    boundwitnessClick(noun, data, 'activeBoundWitness'),
  )

  return (
    <ThrownErrorBoundary rollbar={rollbar} boundaryName={'BoundWitness Scrolling List'}>
      <FlexGrowCol alignItems="stretch" rowGap={3} justifyContent={activeBoundWitnessHash ? 'start' : 'center'} ref={ref} {...props}>
        {loading ?
          <LinearProgress sx={{ minHeight: '10px' }} />
        : null}
        <BWErrorAlert />
        <NestedBoundWitnessesBox />
        {activeBoundWitness ? null : <ActiveBWFlexBox />}
        <Slide direction="down" in={!!activeBoundWitness}>
          <ActiveBWFlexBox ref={activeBWref} />
        </Slide>
      </FlexGrowCol>
    </ThrownErrorBoundary>
  )
})

BoundWitnessesBox.displayName = 'BoundWitnessesBox'
