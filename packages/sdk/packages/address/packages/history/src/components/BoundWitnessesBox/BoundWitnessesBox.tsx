import { LinearProgress, Slide } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { ThrownErrorBoundary, useRollbar } from '@xyo-network/react-error'
import { useEvent } from '@xyo-network/react-event'
import { forwardRef } from 'react'

import { useActiveBoundWitness, useNestedBoundWitnesses } from '../../hooks'
import { ActiveBWFlexBox } from './ActiveBoundWitness'
import { BWErrorAlert } from './Errors'
import { useBoundWitnessClickHandler } from './hooks'
import { NestedBoundWitnessesBox } from './NestedBoundWitnesses'

export const BoundWitnessesBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const { activeBoundWitness, activeBoundWitnessHash } = useActiveBoundWitness(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const { rollbar } = useRollbar()
  const { loading } = useNestedBoundWitnesses(false)

  const [activeBWref] = useEvent<HTMLDivElement>((noun, _verb, data) => boundwitnessClick(noun, data, 'activeBoundWitness'))

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
