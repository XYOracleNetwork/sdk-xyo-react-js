import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface BlockMetaDetails extends FlexBoxProps {
  value?: XyoBoundWitness
}

export const BlockMetaDetails: React.FC<BlockMetaDetails> = ({ value, ...props }) => {
  return (
    <FlexCol alignItems="flex-start" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Block Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <FlexRow flexWrap="wrap">
        {value?._client && (
          <Property flexGrow={1} title="Client" value={value?._client} tip="This client used to create this block" />
        )}
        {value?._archive && (
          <Property
            flexGrow={1}
            title="Archive"
            value={value?._archive}
            tip="This archive that is storing this block"
          />
        )}
        {value?._timestamp && (
          <Property flexGrow={1} title="Timestamp" value={value?._timestamp} tip="This timestamp of the payload" />
        )}
        {value?._user_agent && (
          <Property
            flexGrow={1}
            title="User Agent"
            value={value?._user_agent}
            tip="The UserAgent from the calling client"
          />
        )}
        {value?._source_ip && (
          <Property
            flexGrow={1}
            title="Source IP"
            value={value?._source_ip}
            tip="The source ip from the calling client"
          />
        )}
      </FlexRow>
    </FlexCol>
  )
}
