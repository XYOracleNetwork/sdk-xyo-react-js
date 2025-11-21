import type { BoundWitness, Signed } from '@xyo-network/boundwitness-model'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

import { BoundWitnessSignatureTable } from './SignatureTable.tsx'

export type BoundWitnessSignatureDetailsProps = PropertyGroupProps & {
  block?: Signed<BoundWitness>
}

export const BoundWitnessSignatureDetails: React.FC<BoundWitnessSignatureDetailsProps> = ({ block, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Signatures" tip="The list of signatures for this block" {...props}>
      <BoundWitnessSignatureTable block={block} />
    </PropertyGroup>
  )
}
