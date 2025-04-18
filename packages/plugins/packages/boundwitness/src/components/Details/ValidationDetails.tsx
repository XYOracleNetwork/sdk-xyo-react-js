import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { Property, PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

export type BoundWitnessValidationDetailsProps = PropertyGroupProps & {
  value?: BoundWitness
}

export const BoundWitnessValidationDetails: React.FC<BoundWitnessValidationDetailsProps> = ({ value, ...props }) => {
  const [errors = []] = usePromise(async () => await (value ? new BoundWitnessValidator(value).validate() : undefined), [value])

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="Validation" tip="The results from validating the block" {...props}>
      <Property
        titleProps={{ elevation }}
        flexGrow={1}
        title="Valid"
        value={errors.length === 0 ? 'True' : 'False'}
        tip={
          errors.length > 0
            ? (
                <FlexCol flexWrap="wrap">
                  {errors.map((error) => {
                    return <Typography key={error.name}>{error.toString()}</Typography>
                  })}
                </FlexCol>
              )
            : <Typography>No Errors</Typography>
        }
      />
    </PropertyGroup>
  )
}
