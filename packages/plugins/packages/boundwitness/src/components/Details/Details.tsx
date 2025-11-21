import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { BoundWitness, Signed } from '@xyo-network/boundwitness-model'
import type { Payload } from '@xyo-network/payload-model'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import React from 'react'

import { BoundWitnessPayloads, BoundWitnessSignatureDetails } from '../_shared/index.ts'
import { BoundWitnessValidationDetails } from './ValidationDetails.tsx'

export interface BoundWitnessDetailsProps extends FlexBoxProps {
  payload?: Payload
  /** @field Fetched Payloads for the Bound Witness */
  payloads?: Payload[]
}

const BoundWitnessDetails = ({
  ref, paper, payload, children, ...props
}: BoundWitnessDetailsProps & { ref?: React.Ref<unknown | null> }) => {
  const boundwitness = payload as Signed<BoundWitness> | undefined
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
}

BoundWitnessDetails.displayName = 'BoundWitnessDetails [XYO]'

export { BoundWitnessDetails }
