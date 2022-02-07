import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadValidator } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface PayloadValidationDetailsProps extends FlexBoxProps {
  value?: XyoPayload
}

export const PayloadValidationDetails: React.FC<PayloadValidationDetailsProps> = ({ value, ...props }) => {
  const validator = value ? new XyoPayloadValidator(value) : undefined

  const errors = validator?.all() ?? []

  return (
    <FlexCol alignItems="stretch" {...props}>
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
      </FlexRow>
    </FlexCol>
  )
}
