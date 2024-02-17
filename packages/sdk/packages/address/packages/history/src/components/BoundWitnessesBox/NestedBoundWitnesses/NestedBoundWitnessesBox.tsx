import { Slide } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import { useEvent } from '@xyo-network/react-event'
import { Fragment } from 'react'

import { usePayloadHashSelectionHistory } from '../../../hooks'
import { useBoundWitnessClickHandler } from '../hooks'
import { GlowingDiv } from '../layout'

export type NestedBoundWitnessesProps = FlexBoxProps

export const NestedBoundWitnessesBox: React.FC<NestedBoundWitnessesProps> = (props) => {
  const { nestedBoundWitnesses, hashSelectionHistory } = usePayloadHashSelectionHistory(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const [nestedBWRef] = useEvent<HTMLDivElement>((noun, _verb, data) => boundwitnessClick(noun, data, 'nestedBoundWitnesses'))

  return isEmpty(nestedBoundWitnesses) ? null : (
      <FlexCol alignItems="stretch" ref={nestedBWRef} rowGap={3} {...props}>
        {hashSelectionHistory?.map((hash, index) => (
          <Fragment key={hash}>
            <Slide direction="down" in={!!nestedBoundWitnesses[hash]}>
              <GlowingDiv hash={hash}>
                <BoundWitnessDetailsCard payload={nestedBoundWitnesses[hash]} active={index !== 0} />
              </GlowingDiv>
            </Slide>
          </Fragment>
        ))}
      </FlexCol>
    )
}
