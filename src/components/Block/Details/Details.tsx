import { FlexBoxProps, FlexGrowCol } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { BlockDataDetails } from './DataDetails'
import { BlockHashSourceDetails } from './HashSourceDetails'
import { BlockJsonDetails } from './JsonDetails'
import { BlockMetaDetails } from './MetaDetails'
import { BlockPayloads, BlockPayloadsProps } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

export interface BlockDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
  payloads?: XyoPayload[]
  blockPayloadsProps?: BlockPayloadsProps
}

const payloadsFromBlock = (block?: XyoBoundWitness) => {
  const payloads: XyoPayload[] = []
  if (block) {
    for (let i = 0; i < block.payload_hashes.length; i++) {
      if (block._payloads) {
        payloads.push(block._payloads[i])
      } else {
        payloads.push({ _archive: block._archive, _hash: block.payload_hashes[i], schema: block.payload_schemas[i] })
      }
    }
  }
  return payloads
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ block, payloads, blockPayloadsProps, ...props }) => {
  return (
    <FlexGrowCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <BlockDataDetails block={block} hero showBadge />
      <BlockMetaDetails block={block} />
      <BlockSignatureDetails block={block} />
      <BlockPayloads payloads={payloads ?? payloadsFromBlock(block)} {...blockPayloadsProps} />
      <BlockValidationDetails value={block} />
      <BlockJsonDetails block={block} />
      <BlockHashSourceDetails block={block} />
    </FlexGrowCol>
  )
}
