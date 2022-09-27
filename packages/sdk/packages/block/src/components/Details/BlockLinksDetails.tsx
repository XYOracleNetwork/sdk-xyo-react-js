import { Typography } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type PreviousBlockDetailsProps = PropertyGroupProps & {
  value?: XyoBoundWitness
}

export const BlockLinksDetails: React.FC<PreviousBlockDetailsProps> = ({ value, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="Links" tip="Blocks that are linked to this block" {...props}>
      <Property titleProps={{ elevation }} flexGrow={1} title="Previous Hash" tip={value?.previousHash}>
        {value?.previous_hash ? (
          <LinkEx variant="button">
            <Typography fontFamily="monospace">{value?.previous_hash}</Typography>
          </LinkEx>
        ) : (
          'None'
        )}
      </Property>
    </PropertyGroup>
  )
}
