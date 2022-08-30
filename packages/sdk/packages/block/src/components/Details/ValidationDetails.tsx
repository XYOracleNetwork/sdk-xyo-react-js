import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness, XyoBoundWitnessValidator } from '@xyo-network/boundwitness'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type BlockValidationDetailsProps = PropertyGroupProps & {
  value?: XyoBoundWitness
}

export const BlockValidationDetails: React.FC<BlockValidationDetailsProps> = ({ value, ...props }) => {
  const validator = value ? new XyoBoundWitnessValidator(value) : undefined

  const errors = validator?.validate() ?? []

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
          errors.length > 0 ? (
            <FlexCol flexWrap="wrap">
              {errors.map((error, index) => {
                return <Typography key={index}>{error.toString()}</Typography>
              })}
            </FlexCol>
          ) : (
            <Typography>No Errors</Typography>
          )
        }
      />
    </PropertyGroup>
  )
}
