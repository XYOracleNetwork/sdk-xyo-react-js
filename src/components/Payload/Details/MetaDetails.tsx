import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface PayloadMetaDetails extends FlexBoxProps {
  value?: XyoPayload
}

export const PayloadMetaDetails: React.FC<PayloadMetaDetails> = ({ value, ...props }) => {
  return (
    <FlexCol alignItems="flex-start" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Payload Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <Property title="Hash" value={value?._hash ?? '<Unknown>'} tip="This is the payload hash" />
      <FlexRow flexWrap="wrap">
        {value?._client ? (
          <Property
            flexGrow={1}
            title="Client"
            value={value?._client ?? '<Unknown>'}
            tip="This client used to create this payload"
          />
        ) : null}
        {value?._archive ? (
          <Property
            flexGrow={1}
            title="Archive"
            value={value?._archive}
            tip="This archive that is storing this payload"
          />
        ) : null}
        {value?._timestamp ? (
          <Property
            flexGrow={1}
            title="Timestamp"
            value={value?._timestamp ?? '<Unknown>'}
            tip="This timestamp of the payload"
          />
        ) : null}
      </FlexRow>
    </FlexCol>
  )
}
