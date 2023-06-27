/* eslint-disable deprecation/deprecation */
import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type BlockValidationDetailsProps = PropertyGroupProps & {
  value?: BoundWitness
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockValidationDetails: React.FC<BlockValidationDetailsProps> = ({ value, ...props }) => {
  const [errors = []] = usePromise(() => (value ? new BoundWitnessValidator(value) : undefined)?.validate(), [value])

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
