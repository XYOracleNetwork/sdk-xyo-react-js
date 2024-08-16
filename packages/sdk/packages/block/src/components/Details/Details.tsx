import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { WithChildren } from '@xylabs/react-shared'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { Payload } from '@xyo-network/payload-model'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import React, { forwardRef } from 'react'

import { BlockPayloads } from './Payloads.tsx'
import { BlockSignatureDetails } from './SignatureDetails.tsx'
import { BlockValidationDetails } from './ValidationDetails.tsx'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export interface BlockDetailsProps extends WithChildren, FlexBoxProps {
  block?: BoundWitness
  paper?: boolean
  payloads?: Payload[]
}
/** @deprecated use from @xyo-network/react-default-plugin instead */
const BlockDetails = forwardRef<unknown, BlockDetailsProps>(({ paper, block, payloads, children, ...props }, ref) => {
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" gap={1} ref={ref} {...props}>
      <PayloadDataDetails paper={paper} payload={block} size="large" badge />
      <BlockSignatureDetails paper={paper} block={block} />
      <BlockPayloads paper={paper} payloads={payloads} />
      <BlockValidationDetails paper={paper} value={block} />
      <PayloadJsonDetails paper={paper} payload={block} />
      {children}
    </FlexCol>
  )
})

BlockDetails.displayName = 'BlockDetails [XYO]'

export { BlockDetails }
