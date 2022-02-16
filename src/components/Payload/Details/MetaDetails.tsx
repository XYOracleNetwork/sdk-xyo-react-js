import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface PayloadMetaDetailsProps extends FlexBoxProps {
  value?: XyoPayload
}

export const PayloadMetaDetails: React.FC<PayloadMetaDetailsProps> = ({ value, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Payload Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      {value?._hash ? <Property title="Hash" value={value?._hash} tip="This is the payload hash" /> : null}
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
        {value?._reportedHash ? (
          <Property
            flexGrow={1}
            title="Reported Hash"
            value={value?._reportedHash ?? '<Unknown>'}
            tip="The has reported by the payload"
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
        {value?._observeDuration ? (
          <Property
            flexGrow={1}
            title="Observation Duration"
            value={value?._observeDuration ?? '<Unknown>'}
            tip="This duration of time observed by the witness"
          />
        ) : null}
      </FlexRow>
    </FlexCol>
  )
}
