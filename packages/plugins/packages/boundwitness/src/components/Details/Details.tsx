import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { Payload } from '@xyo-network/payload-model'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import React, { forwardRef } from 'react'

import { BoundWitnessPayloads, BoundWitnessSignatureDetails } from '../_shared/index.js'
import { BoundWitnessValidationDetails } from './ValidationDetails.js'

export interface BoundWitnessDetailsProps extends FlexBoxProps {
  payload?: Payload
  /** @field Fetched Payloads for the Bound Witness */
  payloads?: Payload[]
}

const BoundWitnessDetails = forwardRef<unknown, BoundWitnessDetailsProps>(({ paper, payload, children, ...props }, ref) => {
  const boundwitness = payload as BoundWitness | undefined
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" gap={1} ref={ref} {...props}>
      <PayloadDataDetails paper={paper} payload={boundwitness} size="large" badge />
      <BoundWitnessPayloads paper={paper} payload={boundwitness} />
      <BoundWitnessSignatureDetails paper={paper} block={boundwitness} />
      <BoundWitnessValidationDetails paper={paper} value={boundwitness} />
      <PayloadJsonDetails paper={paper} payload={boundwitness} />
      {children}
    </FlexCol>
  )
})

BoundWitnessDetails.displayName = 'BoundWitnessDetails [XYO]'

export { BoundWitnessDetails }
