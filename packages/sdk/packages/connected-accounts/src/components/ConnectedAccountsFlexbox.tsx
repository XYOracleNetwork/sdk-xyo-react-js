import { Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { forwardRef } from 'react'

import { useDetectedWallets } from '../hooks'
import { ConnectedWalletsTable } from './wallet'

export interface ConnectedAccountsFlexboxProps extends FlexBoxProps {
  ignoreConnectDialog?: boolean
  // A callback that is invoked when the option to ignore the dialog is checked
  onIgnoreConnectDialog?: (checked: boolean) => void
}

export const ConnectedAccountsFlexbox = forwardRef<HTMLDivElement, ConnectedAccountsFlexboxProps>(
  ({ ignoreConnectDialog, onIgnoreConnectDialog, ...props }, ref) => {
    const theme = useTheme()

    const { totalConnectedAccounts, sortedWallets } = useDetectedWallets()

    return (
      <FlexCol alignItems="stretch" justifyContent="start" gap={2} ref={ref} {...props}>
        <FlexCol alignItems="start">
          <Typography variant={'h2'} sx={{ mb: 0.5 }}>
            Detected Web3 Wallets
          </Typography>
          {totalConnectedAccounts ? (
            <Typography variant={'subtitle1'} color={theme.palette.secondary.main} sx={{ opacity: 0.5 }}>
              Total Connected Accounts: {totalConnectedAccounts}
            </Typography>
          ) : null}
        </FlexCol>
        <ConnectedWalletsTable wallets={sortedWallets} ignoreConnectDialog={ignoreConnectDialog} onIgnoreConnectDialog={onIgnoreConnectDialog} />
      </FlexCol>
    )
  },
)

ConnectedAccountsFlexbox.displayName = 'ConnectedAccountsFlexbox'
