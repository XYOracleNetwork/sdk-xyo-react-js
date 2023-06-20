import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { Property, PropertyGroup } from '@xyo-network/react-property'
import { SchemaProperty } from '@xyo-network/react-schema'
import { usePromise } from '@xyo-network/react-shared'

import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

export const PayloadValidationDetails: React.FC<PayloadValidationDetailsProps> = ({ viewSchemaUrl, skipBody = false, value, ...props }) => {
  // const [validateErrors] = usePromise(() => (value ? new PayloadValidator(value).validate() : undefined), [value], 'PayloadValidationDetails')
  const [validateErrors] = [undefined]
  const [error, result, state, testError] = usePromise(() => Promise.reject('promise failed'), [], 'Test Reject')
  console.log(error, result, state, testError)

  const bodyErrors = skipBody ? [] : validateErrors ?? []
  const errors: Error[] = [...bodyErrors]

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="Validation" tip="The results from validating the payload" {...props}>
      <Property
        titleProps={{ elevation }}
        flexGrow={1}
        title="Valid"
        value={errors.length === 0 ? 'True' : 'False'}
        tip={
          errors.length > 0 ? (
            <FlexCol>
              {errors.map((error, index) => {
                return <Typography key={index}>{error.toString()}</Typography>
              })}
            </FlexCol>
          ) : (
            <Typography>No Errors</Typography>
          )
        }
      />
      {value?.schema && <SchemaProperty flexGrow={1} titleProps={{ elevation }} value={value.schema} viewSchemaUrl={viewSchemaUrl} />}
    </PropertyGroup>
  )
}
