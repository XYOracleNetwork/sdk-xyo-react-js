import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { Payload } from '@xyo-network/payload-model'
import { MouseEventHandler, ReactNode } from 'react'

import { RawInfoPayloadCollapse } from '../PayloadCollapse'

export interface RawInfoDialogProps extends DialogProps {
  dialogContent?: ReactNode
  onCloseCallback?: () => void
  payload?: Payload | null
}

export const RawInfoDialog: React.FC<RawInfoDialogProps> = ({ dialogContent, onCloseCallback, payload, ...props }) => {
  const onDialogClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()
  }

  return (
    //  Wrapping in a span so we can catch click events and prevent them from propagating outside the component
    <span onClick={onDialogClick}>
      <Dialog fullWidth maxWidth="lg" onClose={() => onCloseCallback?.()} {...props}>
        <DialogTitle>Raw Data</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {dialogContent}
          <RawInfoPayloadCollapse payload={payload} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => onCloseCallback?.()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
