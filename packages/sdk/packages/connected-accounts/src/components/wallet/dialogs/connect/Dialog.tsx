import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

import { ActiveProvider } from '../../lib'

export interface ConnectWalletDialogProps extends DialogProps {
  activeProvider?: ActiveProvider
}

export const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ activeProvider, ...props }) => {
  const onConnect = async () => {
    try {
      await activeProvider?.connectWallet?.()
      props.onClose?.({}, 'escapeKeyDown')
    } catch (e) {
      console.warn(`Error connecting to wallet: ${(e as Error).message}`)
    }
  }

  return (
    <Dialog {...props}>
      <DialogTitle sx={{ textAlign: 'center' }}>XYO Wants To Access The Blockchain on Your Behalf</DialogTitle>
      <DialogContent sx={{ flexDirection: 'column', gap: 3 }}>
        <FlexRow gap={2}>
          <span>XYO Logo</span>
          <span>handshake icon</span>
          <span>Wallet Logo</span>
        </FlexRow>
        <Typography>This will allow XYO to:</Typography>
        <List>
          <ListItem>View your wallet account(s) and address(es)</ListItem>
          <ListItem>Read-only access to browse the public blockchain(s) you select</ListItem>
        </List>
        <Typography sx={{ textAlign: 'center' }}>
          You control what accounts to share and what blockchains to view. You can see or revoke access via your wallet&apos;s settings at anytime.
          View more on XYO&apos;s sovereign data philosophy [here].
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => props.onClose?.({}, 'escapeKeyDown')}>
          Close
        </Button>
        <Button variant="contained" onClick={onConnect}>
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  )
}
