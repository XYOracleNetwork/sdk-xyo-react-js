import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Stack, Typography } from '@mui/material'
import { FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import React, { ComponentType, ReactNode } from 'react'

export interface ShareOutDialogProps extends DialogProps {
  ShareOutDialogActions?: ComponentType<{ onClose?: () => void }>
  cardImg?: string
  shareOutDialogContent?: ReactNode
  subtitle?: string
  title?: string
}

export const ShareOutDialog: React.FC<ShareOutDialogProps> = ({ ShareOutDialogActions, cardImg, open, onClose, shareOutDialogContent, subtitle, title, ...props }) => {
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
            {cardImg ? <img src={cardImg} height="100px" width="100px" /> : null}
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
