import { Typography } from '@mui/material'
import { FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessValidator } from '@xyo-network/core'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export interface BlockValidationDetailsProps extends PropertyGroupProps {
  value?: XyoBoundWitness
}

export const BlockValidationDetails: React.FC<BlockValidationDetailsProps> = ({ value, ...props }) => {
  const validator = value ? new XyoBoundWitnessValidator(value) : undefined

  const errors = validator?.all() ?? []

  return (
    <PropertyGroup title="Validation" tip="The results from validating the block" {...props}>
      <Property
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
