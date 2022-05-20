import { Paper, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessWrapper } from '@xyo-network/core'

export interface BlockHashSourceDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
}

export const BlockHashSourceDetails: React.FC<BlockHashSourceDetailsProps> = ({ block, ...props }) => {
  const boundWitnessWrapper = block ? new XyoBoundWitnessWrapper(block) : null

  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Hash Source</Typography>
        <QuickTipButton title="Hash Source">The actual string used to generate the hash (SHA256)</QuickTipButton>
      </FlexRow>
      <Paper variant="outlined">
        <Typography margin={1} fontFamily="monospace" variant="body1" sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>
          {boundWitnessWrapper?.sortedStringify() ?? ''}
        </Typography>
      </Paper>
    </FlexCol>
  )
}
