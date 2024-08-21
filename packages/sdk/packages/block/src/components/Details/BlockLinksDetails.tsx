import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { useEvent } from '@xyo-network/react-event'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { Property, PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type PreviousBlockDetailsProps = PropertyGroupProps & {
  value?: BoundWitness
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockLinksDetails: React.FC<PreviousBlockDetailsProps> = ({
  value, ...props
}) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const [ref, dispatch] = useEvent<HTMLDivElement>()

  return (
    <PropertyGroup titleProps={{ elevation }} title="Links" tip="Blocks that are linked to this block" {...props}>
      {value?.previous_hashes.map((hash) => {
        return (
          <Property key={hash} titleProps={{ elevation }} flexGrow={1} title="Previous Hash" tip={hash}>
            {hash
              ? (
                  <FlexRow ref={ref} onClick={() => dispatch?.('boundwitness', 'click', hash)}>
                    <Typography fontFamily="monospace">{hash}</Typography>
                  </FlexRow>
                )
              : 'None'}
          </Property>
        )
      })}
    </PropertyGroup>
  )
}
