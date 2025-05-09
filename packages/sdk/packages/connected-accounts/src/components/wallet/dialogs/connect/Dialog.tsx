import type { DialogProps } from '@mui/material'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material'
import React from 'react'

import type { ActiveProvider } from '../../lib/index.ts'
import { CheckboxFormControl } from './CheckboxFormControl.tsx'
import { LinkedProvidersFlexbox } from './LinkedProvidersFlexbox.tsx'
import { WalletPermissionsFlexbox } from './Permissions.tsx'

export interface ConnectWalletDialogProps extends DialogProps {
  activeProvider?: ActiveProvider
  onIgnoreConnectDialog?: (checked: boolean) => void
}

export const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({
  activeProvider, onIgnoreConnectDialog, ...props
}) => {
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
    <Dialog
      slotProps={{ paper: { sx: { display: 'flex', gap: 4 } } }}
      {...props}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>XYO Wants To Access The Blockchain on Your Behalf</DialogTitle>
      <DialogContent sx={{
        display: 'flex', flexDirection: 'column', gap: 4,
      }}
      >
        <LinkedProvidersFlexbox icon={icon} providerName={providerName} />
        <WalletPermissionsFlexbox />
        <CheckboxFormControl onCheckChanged={onIgnoreConnectDialog} />
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
