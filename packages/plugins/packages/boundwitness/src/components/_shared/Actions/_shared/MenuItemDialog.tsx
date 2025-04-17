import type { DialogProps } from '@mui/material'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material'
import React from 'react'

export interface MenuItemDialogProps extends DialogProps {
  dialogTitle?: string
}

export const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  children, dialogTitle, open, onClose, ...props
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiPaper-root': { minWidth: '75%' } }} {...props}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'end',
      }}
      >
        <Button variant="contained" onClick={e => onClose?.(e, 'escapeKeyDown')}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
