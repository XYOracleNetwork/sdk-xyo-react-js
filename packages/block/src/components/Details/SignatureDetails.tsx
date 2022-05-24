import { XyoBoundWitness } from '@xyo-network/core'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

import { BlockSignatureTable } from './SignatureTable'

export interface BlockSignatureDetailsProps extends PropertyGroupProps {
  block?: XyoBoundWitness
}

export const BlockSignatureDetails: React.FC<BlockSignatureDetailsProps> = ({ block, ...props }) => {
  return (
    <PropertyGroup title="Signatures" tip="The list of signatures for this block" {...props}>
      <BlockSignatureTable block={block} />
    </PropertyGroup>
  )
}
