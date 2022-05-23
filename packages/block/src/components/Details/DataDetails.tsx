import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'
import { Property, usePropertyHeroProps } from '@xyo-network/react-property'
import { SizeProp } from '@xyo-network/react-shared'

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
