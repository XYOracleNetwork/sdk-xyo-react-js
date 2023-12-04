import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'

import { RevokedProvider } from '../../lib'

export interface RevokeWalletConnectionDialogProps extends DialogProps {
  revokedProvider?: RevokedProvider
}

export const RevokeWalletConnectionDialog: React.FC<RevokeWalletConnectionDialogProps> = ({ revokedProvider, ...props }) => {
  return (
    <Dialog {...props}>
      <FlexRow gap={2} justifyContent="start" pl={2}>
        <ConstrainedImage src={revokedProvider?.icon} constrainedValue={'24px'} />
        <DialogTitle sx={{ pl: 0 }}>Revoke {revokedProvider?.providerName} Access</DialogTitle>
      </FlexRow>
      <DialogContent>
        <Typography>
          Revoking access to your wallet must be done from the wallet&apos;s browser extension. Wallets grant access to specific domains please
          consult {revokedProvider?.providerName}&apos;s documentation on how to revoke access to this website:
        </Typography>
        <Typography>{window.location.origin}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => props.onClose?.({}, 'escapeKeyDown')}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
