import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/core'

import { PayloadDataDetails, PayloadDataDetailsProps } from './DataDetails'
import { PayloadJsonDetails, PayloadJsonDetailsProps } from './JsonDetails'
import { PayloadMetaDetails, PayloadMetaDetailsProps } from './MetaDetails'
import { PayloadValidationDetails, PayloadValidationDetailsProps } from './ValidationDetails'

export interface PayloadDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
  payloadDataDetailsProps?: PayloadDataDetailsProps
  payloadMetaDetailsProps?: PayloadMetaDetailsProps
  payloadValidationDetailsProps?: PayloadValidationDetailsProps
  payloadJsonDetailsProps?: PayloadJsonDetailsProps
}

export const PayloadDetails: React.FC<PayloadDetailsProps> = ({
  payload,
  payloadDataDetailsProps,
  payloadMetaDetailsProps,
  payloadValidationDetailsProps,
  payloadJsonDetailsProps,
  ...props
}) => {
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <PayloadDataDetails size="large" badge value={payload} {...payloadDataDetailsProps} />
      <PayloadMetaDetails value={payload} {...payloadMetaDetailsProps} />
      <PayloadValidationDetails value={payload} {...payloadValidationDetailsProps} />
      <PayloadJsonDetails payload={payload} {...payloadJsonDetailsProps} />
    </FlexCol>
  )
}
