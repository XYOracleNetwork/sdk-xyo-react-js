import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'

export const RevokeWalletDialog: React.FC<DialogProps> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Revoking Access to your Web3 Wallet</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => props.onClose?.({}, 'escapeKeyDown')}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
