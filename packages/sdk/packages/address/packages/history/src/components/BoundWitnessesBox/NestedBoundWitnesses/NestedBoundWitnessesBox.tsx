import { Slide } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useXyoEvent } from '@xyo-network/react-event'
import isEmpty from 'lodash/isEmpty'
import { Fragment } from 'react'

import { useHashSelectionHistory } from '../../../contexts'
import { useBoundWitnessClickHandler } from '../hooks'
import { NestedBoundWitnessBox } from './NestedBoundWitnessBox'

export type NestedBoundWitnessesProps = FlexBoxProps

export const NestedBoundWitnessesBox: React.FC<NestedBoundWitnessesProps> = (props) => {
  const { nestedBoundWitnesses, hashSelectionHistory } = useHashSelectionHistory()
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const [nestedBWRef] = useXyoEvent<HTMLDivElement>((noun, _verb, data) => boundwitnessClick(noun, data, 'nestedBoundWitnesses'))

  return isEmpty(nestedBoundWitnesses) ? null : (
    <FlexCol alignItems="stretch" ref={nestedBWRef} rowGap={3} {...props}>
      {hashSelectionHistory?.map((hash, index) => (
        <Fragment key={hash}>
          <Slide direction="down" in={!!nestedBoundWitnesses[hash]}>
            <NestedBoundWitnessBox boundwitness={nestedBoundWitnesses[hash]} index={index} hash={hash} />
          </Slide>
        </Fragment>
      ))}
    </FlexCol>
  )
}
