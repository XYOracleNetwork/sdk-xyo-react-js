import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import React from 'react'

import { NodeDetails } from './NodeDetails.tsx'

export interface DebugDialogProps extends DialogProps {}

export const DebugDialog: React.FC<DebugDialogProps> = ({ onClose, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Xyo Module Viewer</DialogTitle>
      <DialogContent>
        <NodeDetails width="100%" />
      </DialogContent>
      <DialogActions>
        <Button onClick={event => onClose?.(event, 'backdropClick')}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
