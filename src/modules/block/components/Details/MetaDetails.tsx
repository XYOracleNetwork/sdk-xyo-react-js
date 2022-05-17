import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'

import { ArchiveProperty } from '../../../_shared'
import { Property } from '../../../property'

export interface BlockMetaDetails extends FlexBoxProps {
  block?: XyoBoundWitness
  archivePath?: string
}

export const BlockMetaDetails: React.FC<BlockMetaDetails> = ({ block, archivePath, ...props }) => {
  return (
    <FlexCol alignItems="start" {...props}>
      <FlexRow margin={1} justifyContent="start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Block Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <FlexRow flexWrap="wrap">
        {block?._client ? <Property flexGrow={1} title="Client" value={block?._client} tip="This client used to create this block" /> : null}
        {block?._archive ? <ArchiveProperty payload={block} path={archivePath} /> : null}
        {block?._timestamp ? <Property flexGrow={1} title="Timestamp" value={block?._timestamp} tip="This timestamp of the payload" /> : null}
        {block?._user_agent ? <Property flexGrow={1} title="User Agent" value={block?._user_agent} tip="The UserAgent from the calling client" /> : null}
        {block?._source_ip ? <Property flexGrow={1} title="Source IP" value={block?._source_ip} tip="The source ip from the calling client" /> : null}
      </FlexRow>
    </FlexCol>
  )
}
