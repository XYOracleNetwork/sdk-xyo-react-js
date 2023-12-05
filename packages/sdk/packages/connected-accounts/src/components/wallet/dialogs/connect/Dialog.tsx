import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'

import { ActiveProvider } from '../../lib'
import { IgnoreDialogFormControl } from './Ignore'
import { LinkedProvidersFlexbox } from './LinkedProvidersFlexbox'
import { WalletPermissionsFlexbox } from './Permissions'

export interface ConnectWalletDialogProps extends DialogProps {
  activeProvider?: ActiveProvider
  onIgnoreConnectDialog?: (checked: boolean) => void
}

export const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ activeProvider, onIgnoreConnectDialog, ...props }) => {
  const { icon, providerName } = activeProvider ?? {}

  const onConnect = async () => {
    try {
      await activeProvider?.connectWallet?.()
      props.onClose?.({}, 'escapeKeyDown')
    } catch (e) {
      console.warn(`Error connecting to wallet: ${(e as Error).message}`)
    }
  }

  return (
    <Dialog PaperProps={{ sx: { display: 'flex', gap: 4 } }} {...props}>
      <DialogTitle sx={{ textAlign: 'center' }}>XYO Wants To Access The Blockchain on Your Behalf</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <LinkedProvidersFlexbox icon={icon} providerName={providerName} />
        <WalletPermissionsFlexbox />
        <IgnoreDialogFormControl onCheckChanged={onIgnoreConnectDialog} />
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
