import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'
import { XyoPayloadValidator } from '@xyo-network/core'
import { Property, PropertyGroup } from '@xyo-network/react-property'

import { SchemaProperty } from './SchemaProperty'
import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

export const PayloadValidationDetails: React.FC<PayloadValidationDetailsProps> = ({ viewSchemaUrl, skipMeta = false, skipBody = false, value, ...props }) => {
  const validator = value ? new XyoPayloadValidator(value) : undefined

  const bodyErrors = skipBody ? [] : validator?.body.all() ?? []
  const metaErrors = skipMeta ? [] : validator?.meta.all() ?? []
  const errors: Error[] = [...bodyErrors, ...metaErrors]

  return (
    <PropertyGroup title="Validation" tip="The results from validating the payload" {...props}>
      <Property
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
      {value?.schema && <SchemaProperty value={value} viewSchemaUrl={viewSchemaUrl} />}
    </PropertyGroup>
  )
}
