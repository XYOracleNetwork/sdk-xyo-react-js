import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'

import { Property } from '../../../property'
import { BlockSignatureTable } from './SignatureTable'

export interface BlockSignatureDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
}

export const BlockSignatureDetails: React.FC<BlockSignatureDetailsProps> = ({ block, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Signatures</Typography>
        <QuickTipButton title="Block Data">The list of signatures for this block.</QuickTipButton>
      </FlexRow>
      <Property value={!!block}>
        <BlockSignatureTable block={block} />
      </Property>
    </FlexCol>
  )
}
