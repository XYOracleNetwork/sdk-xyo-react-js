import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'

export const ConnectWalletDialog: React.FC<DialogProps> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTitle></DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained">Connect</Button>
      </DialogActions>
    </Dialog>
  )
}
