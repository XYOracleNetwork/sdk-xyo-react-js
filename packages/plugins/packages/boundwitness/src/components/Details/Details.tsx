import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { BoundWitnessPayloads, BoundWitnessSignatureDetails } from '../_shared'
import { BoundWitnessValidationDetails } from './ValidationDetails'

export interface BoundWitnessDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
  /** @field Fetched Payloads for the Bound Witness */
  payloads?: XyoPayloads
}

const BoundWitnessDetails = forwardRef<unknown, BoundWitnessDetailsProps>(({ paper, payload, children, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness | undefined
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
