import { Typography } from '@mui/material'
import { FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayloadValidator } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../../../property'
import { SchemaProperty } from './SchemaProperty'
import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

export const PayloadValidationDetails: React.FC<PayloadValidationDetailsProps> = ({ viewSchemaUrl, skipMeta = false, skipBody = false, value, ...props }) => {
  const validator = value ? new XyoPayloadValidator(value) : undefined

  const bodyErrors = skipBody ? [] : validator?.body.all() ?? []
  const metaErrors = skipMeta ? [] : validator?.meta.all() ?? []
  const errors: Error[] = [...bodyErrors, ...metaErrors]

  return (
    <FlexCol alignItems="start" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Validation</Typography>
        <QuickTipButton title="Block Validation">The results from validating the payload</QuickTipButton>
      </FlexRow>
      <FlexRow flexWrap="wrap">
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
      </FlexRow>
    </FlexCol>
  )
}
