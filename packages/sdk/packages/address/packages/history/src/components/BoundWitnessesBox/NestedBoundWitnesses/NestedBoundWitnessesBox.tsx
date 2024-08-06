import { Slide } from '@mui/material'
import { Hash } from '@xylabs/hex'
import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import { EventNoun, EventVerb, useEvent } from '@xyo-network/react-event'
import React, { Fragment } from 'react'

import { usePayloadHashSelectionHistory } from '../../../hooks/index.js'
import { useBoundWitnessClickHandler } from '../hooks/index.js'
import { GlowingDiv } from '../layout/index.js'

export type NestedBoundWitnessesProps = FlexBoxProps

export const NestedBoundWitnessesBox: React.FC<NestedBoundWitnessesProps> = (props) => {
  const { nestedBoundWitnesses, hashSelectionHistory } = usePayloadHashSelectionHistory(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const [nestedBWRef] = useEvent<HTMLDivElement, EventNoun, EventVerb, Hash>((noun, _verb, data) =>
    boundwitnessClick(noun, data, 'nestedBoundWitnesses'),
  )

  return isEmpty(nestedBoundWitnesses)
    ? null
    : (
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
