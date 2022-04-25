import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { Property, PropertyHeroProps, usePropertyHeroProps } from '../../../property'

export interface BlockDataDetailsProps extends PropertyHeroProps, FlexBoxProps {
  block?: XyoBoundWitness
}

export const BlockDataDetails: React.FC<BlockDataDetailsProps> = ({ block, ...props }) => {
  const propertyHeroProps = usePropertyHeroProps(props)
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property title="Block Hash" value={block?._hash ?? '<Unknown>'} tip="This is the block hash" {...propertyHeroProps} />
    </FlexCol>
  )
}
