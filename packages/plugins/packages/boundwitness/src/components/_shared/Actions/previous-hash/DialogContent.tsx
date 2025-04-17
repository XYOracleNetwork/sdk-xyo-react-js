import { ContentCopy } from '@mui/icons-material'
import type { DialogContentProps } from '@mui/material'
import {
  Alert, AlertTitle, Collapse,
  DialogContent,
} from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { EllipsizeBox } from '@xyo-network/react-shared'
import React, { useState } from 'react'

export interface PreviousHashDialogProps extends DialogContentProps {
  boundwitness?: BoundWitness
}

export const PreviousHashDialogContent: React.FC<PreviousHashDialogProps> = ({ boundwitness, ...props }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    await navigator.clipboard.writeText(boundwitness?.previous_hashes[0] ?? '')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <DialogContent {...props}>
      <FlexGrowRow columnGap={2}>
        <ContentCopy sx={{ cursor: 'pointer' }} onClick={() => void onCopy()} />
        <EllipsizeBox flexGrow="1" typographyProps={{ variant: 'body1' }}>
          {boundwitness?.previous_hashes.join(',')}
        </EllipsizeBox>
      </FlexGrowRow>
      <FlexRow>
        <Collapse in={copied} unmountOnExit>
          <Alert>
            <AlertTitle>Previous hash copied to clipboard</AlertTitle>
          </Alert>
        </Collapse>
      </FlexRow>
    </DialogContent>
  )
}
