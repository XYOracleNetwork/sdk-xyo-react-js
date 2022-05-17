import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/core'

import { ArchiveProperty } from '../../../_shared'
import { Property } from '../../../property'

export interface PayloadMetaDetailsProps extends FlexBoxProps {
  value?: XyoPayload
  archivePath?: string
}

export const PayloadMetaDetails: React.FC<PayloadMetaDetailsProps> = ({ archivePath, value, ...props }) => {
  return (
    <FlexCol alignItems="start" {...props}>
      <FlexRow margin={1} justifyContent="start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Payload Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <FlexRow flexWrap="wrap">
        {value?._client ? <Property flexGrow={1} title="Client" value={value?._client ?? '<Unknown>'} tip="This client used to create this payload" /> : null}
        {value?._archive ? <ArchiveProperty payload={value} path={archivePath} /> : null}
        {value?._reportedHash ? <Property flexGrow={1} title="Reported Hash" value={value?._reportedHash ?? '<Unknown>'} tip="The has reported by the payload" /> : null}
        {value?._timestamp ? <Property flexGrow={1} title="Timestamp" value={value?._timestamp ?? '<Unknown>'} tip="This timestamp of the payload" /> : null}
        {value?._observeDuration ? (
          <Property flexGrow={1} title="Observation Duration" value={value?._observeDuration ?? '<Unknown>'} tip="This duration of time observed by the witness" />
        ) : null}
      </FlexRow>
    </FlexCol>
  )
}
