import { LinearProgress, Slide } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { useRollbar, XyoThrownErrorBoundary } from '@xyo-network/react-error'
import { useXyoEvent } from '@xyo-network/react-event'
import { forwardRef } from 'react'

import { useActiveBoundWitness, useNestedBoundWitnesses } from '../../contexts'
import { ActiveBWFlexBox } from './ActiveBoundWitness'
import { BWErrorAlert } from './Errors'
import { useBoundWitnessClickHandler } from './hooks'
import { NestedBoundWitnessesBox } from './NestedBoundWitnesses'

export const BoundWitnessesBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const { activeBoundWitness, activeBoundWitnessHash } = useActiveBoundWitness(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const { rollbar } = useRollbar()
  const { loading } = useNestedBoundWitnesses(false)

  const [activeBWref] = useXyoEvent<HTMLDivElement>((noun, _verb, data) => boundwitnessClick(noun, data, 'activeBoundWitness'))

  return (
    <XyoThrownErrorBoundary rollbar={rollbar} boundaryName={'BoundWitness Scrolling List'}>
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
        <BWErrorAlert />
        <NestedBoundWitnessesBox />
        {!activeBoundWitness ? <ActiveBWFlexBox /> : null}
        <Slide direction="down" in={!!activeBoundWitness}>
          <ActiveBWFlexBox ref={activeBWref} />
        </Slide>
      </FlexGrowCol>
    </XyoThrownErrorBoundary>
  )
})

BoundWitnessesBox.displayName = 'BoundWitnessesBox'
