import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { useXyoEvent } from '@xyo-network/react-event'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type BoundWitnessLinksDetails = PropertyGroupProps & {
  value?: BoundWitness
}

export const BoundWitnessLinksDetails: React.FC<BoundWitnessLinksDetails> = ({ value, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const [ref, dispatch] = useXyoEvent<HTMLDivElement>()

  return (
    <PropertyGroup titleProps={{ elevation }} title="Links" tip="Blocks that are linked to this block" {...props}>
      {value?.previous_hashes.map((hash) => {
        return (
          <Property key={hash} titleProps={{ elevation }} flexGrow={1} title="Previous Hash" tip={hash}>
            {hash ? (
              <FlexRow ref={ref} onClick={() => dispatch?.('boundwitness', 'click', hash)}>
                <Typography fontFamily="monospace">{hash}</Typography>
              </FlexRow>
            ) : (
              'None'
            )}
          </Property>
        )
      })}
    </PropertyGroup>
  )
}
