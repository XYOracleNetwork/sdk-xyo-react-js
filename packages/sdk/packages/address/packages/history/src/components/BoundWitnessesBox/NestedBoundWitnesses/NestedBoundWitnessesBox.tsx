import { Slide } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Hash } from '@xylabs/sdk-js'
import { BoundWitnessDetailsCard } from '@xyo-network/react-boundwitness-plugin'
import type { EventNoun, EventVerb } from '@xyo-network/react-event'
import { useEvent } from '@xyo-network/react-event'
import React, { Fragment } from 'react'

import { usePayloadHashSelectionHistory } from '../../../hooks/index.ts'
import { useBoundWitnessClickHandler } from '../hooks/index.ts'
import { GlowingDiv } from '../layout/index.ts'

export type NestedBoundWitnessesProps = FlexBoxProps

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const NestedBoundWitnessesBox: React.FC<NestedBoundWitnessesProps> = (props) => {
  const { nestedBoundWitnesses, hashSelectionHistory } = usePayloadHashSelectionHistory(false)
  const { boundwitnessClick } = useBoundWitnessClickHandler()
  const [nestedBWRef] = useEvent<HTMLDivElement, EventNoun, EventVerb, Hash>((noun, _verb, data) =>
    boundwitnessClick(noun, data, 'nestedBoundWitnesses'))

  return isEmpty(nestedBoundWitnesses)
    ? null
    : (
        <FlexCol alignItems="stretch" ref={nestedBWRef} rowGap={3} {...props}>
          {hashSelectionHistory?.map((hash, index) => (
            <Fragment key={hash}>
              <Slide direction="down" in={!!nestedBoundWitnesses?.[hash]}>
                <GlowingDiv hash={hash}>
                  <BoundWitnessDetailsCard payload={nestedBoundWitnesses?.[hash]} active={index !== 0} />
                </GlowingDiv>
              </Slide>
            </Fragment>
          ))}
        </FlexCol>
      )
}
