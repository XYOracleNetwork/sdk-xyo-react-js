import { Stack, StackProps } from '@mui/material'
import { XyoBoundWitness, XyoPayload } from '@xyo-network/core'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload'
import uniqWith from 'lodash/uniqWith'

import { BlockMetaDetails } from './MetaDetails'
import { BlockPayloads } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

export interface BlockDetailsProps extends StackProps {
  block?: XyoBoundWitness
  paper?: boolean
  payloads?: XyoPayload[]
  archivePath?: string
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

export const BlockDetails: React.FC<BlockDetailsProps> = ({ paper, archivePath, block, payloads, ...props }) => {
  return (
    <Stack justifyContent="flex-start" alignItems="stretch" spacing={1} {...props}>
      <PayloadDataDetails paper={paper} value={block} size="large" badge />
      <BlockMetaDetails paper={paper} block={block} archivePath={archivePath} />
      <BlockSignatureDetails paper={paper} block={block} />
      <BlockPayloads paper={paper} payloads={payloads ?? payloadsFromBlock(block)} />
      <BlockValidationDetails paper={paper} value={block} />
      <PayloadJsonDetails paper={paper} payload={block} />
    </Stack>
  )
}
