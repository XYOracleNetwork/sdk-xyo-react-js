import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface BlockDataDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
}

export const BlockDataDetails: React.FC<BlockDataDetailsProps> = ({ block, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Data</Typography>
        <QuickTipButton title="Block Data">
          The protocol fields for the block. All these fields are used to generate the hash.
        </QuickTipButton>
      </FlexRow>
      <Property title="Block Hash" value={block?._hash ?? '<Unknown>'} tip="This is the block hash" />
    </FlexCol>
  )
}
