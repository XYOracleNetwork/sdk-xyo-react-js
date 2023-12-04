import { SyncAlt } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Link, Typography } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'

import { xyoColorLogo } from '../../../../img'
import { ActiveProvider } from '../../lib'

export interface ConnectWalletDialogProps extends DialogProps {
  activeProvider?: ActiveProvider
}

export const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ activeProvider, ...props }) => {
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
        <FlexRow gap={4} justifyContent="space-evenly">
          <FlexCol>
            <img alt="XYO Logo" src={xyoColorLogo} style={{ height: '48px' }} />
            <Typography variant="subtitle1">XYO App</Typography>
          </FlexCol>
          <SyncAlt fontSize={'large'} />
          <FlexCol>
            <ConstrainedImage constrainedValue={'48px'} src={icon} alt={providerName} style={{ height: '48px', maxWidth: '48px' }} />
            <Typography variant="subtitle1">{providerName}</Typography>
          </FlexCol>
        </FlexRow>
        <FlexCol gap={4}>
          <Typography fontWeight="bold" sx={{ textAlign: 'center' }}>
            This will allow XYO to:
          </Typography>
          <ul>
            <li>View your wallet account(s) and address(es)</li>
            <li>Read-only access to browse the public blockchain(s) you select</li>
          </ul>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            You control what accounts to share and what blockchains to view. You can see or revoke access via your wallet&apos;s settings at anytime.
            View more on XYO&apos;s sovereign data philosophy{' '}
            <Link
              href="https://cointelegraph.com/innovation-circle/decentralization-and-sovereignty-debunking-our-approach-to-digital-sovereignty"
              sx={{ fontWeight: 'bold' }}
              target="_blank"
            >
              here
            </Link>
            .
          </Typography>
        </FlexCol>
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
