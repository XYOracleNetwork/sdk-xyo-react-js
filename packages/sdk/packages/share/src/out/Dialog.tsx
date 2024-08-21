import type { DialogProps } from '@mui/material'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography,
} from '@mui/material'
import { FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'

export interface ShareOutDialogProps extends DialogProps {
  ShareOutDialogActions?: ComponentType<{ onClose?: () => void }>
  cardImg?: ReactNode
  shareOutDialogContent?: ReactNode
  subtitle?: string
  title?: string
}

export const ShareOutDialog: React.FC<ShareOutDialogProps> = ({
  ShareOutDialogActions, cardImg, open, onClose, shareOutDialogContent, subtitle, title, ...props
}) => {
  const handleClose = () => {
    onClose?.('', 'backdropClick')
  }

  return (
    <Dialog onClose={onClose} open={open} {...props}>
      <DialogTitle>
        <Stack direction="row" spacing={2}>
          <FlexGrowCol alignItems="flex-start" width="60%">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">
              {' '}
              {subtitle}
            </Typography>
          </FlexGrowCol>
          <FlexGrowCol alignItems="flex-end" width="40%">
            {cardImg}
          </FlexGrowCol>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {shareOutDialogContent}
        <FlexCol alignItems="stretch">
        </FlexCol>
      </DialogContent>
      {ShareOutDialogActions ? <DialogActions><ShareOutDialogActions onClose={handleClose} /></DialogActions> : null}
    </Dialog>
  )
}
