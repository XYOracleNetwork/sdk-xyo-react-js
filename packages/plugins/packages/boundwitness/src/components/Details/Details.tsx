import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { BlockPayloads } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

export interface BoundWitnessDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
  payloads?: XyoPayload[]
}

const BoundWitnessDetails = forwardRef<unknown, BoundWitnessDetailsProps>(({ paper, payload, payloads, children, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness | undefined
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" gap={1} ref={ref} {...props}>
      <PayloadDataDetails paper={paper} payload={boundwitness} size="large" badge />
      <BlockSignatureDetails paper={paper} block={boundwitness} />
      <BlockPayloads paper={paper} payloads={payloads} />
      <BlockValidationDetails paper={paper} value={boundwitness} />
      <PayloadJsonDetails paper={paper} payload={boundwitness} />
      {children}
    </FlexCol>
  )
})

BoundWitnessDetails.displayName = 'BoundWitnessDetails [XYO]'

export { BoundWitnessDetails }
