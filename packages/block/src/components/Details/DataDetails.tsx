import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'
import { Property, SizeProp, usePropertyHeroProps } from '@xyo-network/react-property'

export interface BlockDataDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
  size?: SizeProp
  badge?: boolean
}

export const BlockDataDetails: React.FC<BlockDataDetailsProps> = ({ badge, size, block, ...props }) => {
  const propertyHeroProps = usePropertyHeroProps(props)
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property size={size} badge={badge} title="Block Hash" value={block?._hash ?? '<Unknown>'} tip="This is the block hash" {...propertyHeroProps} />
    </FlexCol>
  )
}
