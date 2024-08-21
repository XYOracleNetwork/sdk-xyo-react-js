import { LinearProgress, Slide } from '@mui/material'
import type { Hash } from '@xylabs/hex'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { ThrownErrorBoundary, useRollbar } from '@xyo-network/react-error'
import type { EventNoun, EventVerb } from '@xyo-network/react-event'
import { useEvent } from '@xyo-network/react-event'
import React, { forwardRef } from 'react'

import { useActiveBoundWitness, useNestedBoundWitnesses } from '../../hooks/index.ts'
import { ActiveBWFlexBox } from './ActiveBoundWitness/index.ts'
import { BWErrorAlert } from './Errors/index.ts'
import { useBoundWitnessClickHandler } from './hooks/index.ts'
import { NestedBoundWitnessesBox } from './NestedBoundWitnesses/index.ts'

export const BoundWitnessesBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const {
    activeBoundWitness, activeBoundWitnessHash,
  } = useActiveBoundWitness(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const { rollbar } = useRollbar()
  const { loading } = useNestedBoundWitnesses(false)

  const [activeBWref] = useEvent<HTMLDivElement, EventNoun, EventVerb, Hash>((noun, _verb, data) =>
    boundwitnessClick(noun, data, 'activeBoundWitness'))

  return (
    <ThrownErrorBoundary rollbar={rollbar} boundaryName="BoundWitness Scrolling List">
      <FlexGrowCol alignItems="stretch" rowGap={3} justifyContent={activeBoundWitnessHash ? 'start' : 'center'} ref={ref} {...props}>
        {loading
          ? <LinearProgress sx={{ minHeight: '10px' }} />
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
