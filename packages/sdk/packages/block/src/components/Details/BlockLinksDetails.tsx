/* eslint-disable deprecation/deprecation */
import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { useXyoEvent } from '@xyo-network/react-event'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type PreviousBlockDetailsProps = PropertyGroupProps & {
  value?: XyoBoundWitness
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockLinksDetails: React.FC<PreviousBlockDetailsProps> = ({ value, ...props }) => {
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
