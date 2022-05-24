import { Stack, StackProps } from '@mui/material'
import { XyoBoundWitness, XyoPayload } from '@xyo-network/core'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload'
import uniqWith from 'lodash/uniqWith'

import { BlockMetaDetails } from './MetaDetails'
import { BlockPayloads, BlockPayloadsProps } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

export interface BlockDetailsProps extends StackProps {
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
    <Stack justifyContent="flex-start" alignItems="stretch" spacing={1} {...props}>
      <PayloadDataDetails value={block} size="large" badge />
      <BlockMetaDetails block={block} {...blockMetaDetailsProps} />
      <BlockSignatureDetails block={block} />
      <BlockPayloads payloads={payloads ?? payloadsFromBlock(block)} {...blockPayloadsProps} />
      <BlockValidationDetails value={block} />
      <PayloadJsonDetails payload={block} />
    </Stack>
  )
}
