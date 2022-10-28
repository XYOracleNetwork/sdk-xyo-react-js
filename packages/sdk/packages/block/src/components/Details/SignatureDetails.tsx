/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

import { BlockSignatureTable } from './SignatureTable'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type BlockSignatureDetailsProps = PropertyGroupProps & {
  block?: XyoBoundWitness
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
