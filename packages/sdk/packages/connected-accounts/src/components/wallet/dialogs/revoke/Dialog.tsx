import type { DialogProps } from '@mui/material'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import type { ActiveProvider } from '../../lib/index.ts'

export interface RevokeWalletConnectionDialogProps extends DialogProps {
  activeProvider?: ActiveProvider
}

export const RevokeWalletConnectionDialog: React.FC<RevokeWalletConnectionDialogProps> = ({ activeProvider, ...props }) => {
  return (
    <Dialog {...props}>
      <FlexRow gap={2} justifyContent="start" pl={2}>
        <ConstrainedImage src={activeProvider?.icon} constrainedValue="24px" />
        <DialogTitle sx={{ pl: 0 }}>
          Revoke
          {activeProvider?.providerName}
          {' '}
          Access
        </DialogTitle>
      </FlexRow>
      <DialogContent>
        <Typography>
          Revoking access to your wallet must be done from the wallet&apos;s browser extension. Wallets grant access to specific domains please
          consult
          {' '}
          {activeProvider?.providerName}
          &apos;s documentation on how to revoke access to this website:
        </Typography>
        <Typography>{globalThis.location.origin}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => props.onClose?.({}, 'escapeKeyDown')}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
