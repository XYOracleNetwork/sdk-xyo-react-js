import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { PayloadDataDetails, PayloadDataDetailsProps } from './DataDetails'
import { PayloadHashSourceDetails } from './HashSourceDetails'
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
      <PayloadDataDetails isHero={true} showBadge={true} value={payload} {...payloadDataDetailsProps} />
      <PayloadMetaDetails value={payload} {...payloadMetaDetailsProps} />
      <PayloadValidationDetails value={payload} {...payloadValidationDetailsProps} />
      <PayloadJsonDetails payload={payload} {...payloadJsonDetailsProps} />
      <PayloadHashSourceDetails payload={payload} />
    </FlexCol>
  )
}
