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
        <Property
          flexGrow={1}
          title="Client"
          value={value?._client ?? '<Unknown>'}
          tip="This client used to create this block"
        />
        <Property
          flexGrow={1}
          title="Archive"
          value={value?._archive ?? '<Unknown>'}
          tip="This archive that is storing this block"
        />
        <Property
          flexGrow={1}
          title="User Agent"
          value={value?._user_agent ?? '<Unknown>'}
          tip="The UserAgent from the calling client"
        />
        <Property
          flexGrow={1}
          title="Source IP"
          value={value?._source_ip ?? '<Unknown>'}
          tip="The source ip from the calling client"
        />
      </FlexRow>
    </FlexCol>
  )
}
