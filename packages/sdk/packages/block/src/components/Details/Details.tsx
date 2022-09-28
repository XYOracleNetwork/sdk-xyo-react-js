import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'

import { BlockLinksDetails } from './BlockLinksDetails'
import { BlockPayloads } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

export interface BlockDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
  paper?: boolean
  payloads?: XyoPayload[]
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ paper, block, payloads, ...props }) => {
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" gap={1} {...props}>
      <PayloadDataDetails paper={paper} payload={block} size="large" badge />
      <BlockLinksDetails value={block} />
      <BlockSignatureDetails paper={paper} block={block} />
      <BlockPayloads paper={paper} payloads={payloads} />
      <BlockValidationDetails paper={paper} value={block} />
      <PayloadJsonDetails paper={paper} payload={block} />
    </FlexCol>
  )
}
