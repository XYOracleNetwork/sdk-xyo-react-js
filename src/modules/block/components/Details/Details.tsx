import { FlexBoxProps, FlexGrowCol } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoPayload } from '@xyo-network/core'
import uniqWith from 'lodash/uniqWith'

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
  blockMetaDetailsProps?: BlockMetaDetails
}

const payloadsFromBlock = (block?: XyoBoundWitness) => {
  const payloads: XyoPayload[] = []
  if (block) {
    block.payload_hashes.forEach((_, index) => {
      payloads.push(
        block._payloads
          ? block._payloads[index]
          : {
              _archive: block._archive,
              _hash: block.payload_hashes[index],
              schema: block.payload_schemas[index],
            }
      )
    })
  }
  return uniqWith(payloads, (a, b) => a._hash === b._hash)
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ block, payloads, blockPayloadsProps, blockMetaDetailsProps, ...props }) => {
  return (
    <FlexGrowCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <BlockDataDetails block={block} hero showBadge />
      <BlockMetaDetails block={block} {...blockMetaDetailsProps} />
      <BlockSignatureDetails block={block} />
      <BlockPayloads payloads={payloads ?? payloadsFromBlock(block)} {...blockPayloadsProps} />
      <BlockValidationDetails value={block} />
      <BlockJsonDetails block={block} />
      <BlockHashSourceDetails block={block} />
    </FlexGrowCol>
  )
}
