import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

import { BlockSignatureTable } from './SignatureTable.tsx'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type BlockSignatureDetailsProps = PropertyGroupProps & {
  block?: BoundWitness
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockSignatureDetails: React.FC<BlockSignatureDetailsProps> = ({ block, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Signatures" tip="The list of signatures for this block" {...props}>
      <BlockSignatureTable block={block} />
    </PropertyGroup>
  )
}
