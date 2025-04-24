import { Typography, useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { useDetectedWallets } from '../hooks/index.ts'
import { ConnectedWalletsTable } from './wallet/index.ts'

export interface ConnectedAccountsFlexboxProps extends FlexBoxProps {
  ignoreConnectDialog?: boolean
  // A callback that is invoked when the option to ignore the dialog is checked
  onIgnoreConnectDialog?: (checked: boolean) => void
}

export const ConnectedAccountsFlexbox = ({
  ref, ignoreConnectDialog, onIgnoreConnectDialog, ...props
}: ConnectedAccountsFlexboxProps) => {
  const theme = useTheme()

  const { totalConnectedAccounts, sortedWallets } = useDetectedWallets()

  return (
    <FlexCol alignItems="stretch" justifyContent="start" gap={2} ref={ref} {...props}>
      <FlexCol alignItems="start">
        <Typography variant="h2" sx={{ mb: 0.5 }}>
          Detected Web3 Wallets
        </Typography>
        {totalConnectedAccounts
          ? (
              <Typography variant="subtitle1" color={theme.vars.palette.secondary.main} sx={{ opacity: 0.5 }}>
                Total Connected Accounts:
                {' '}
                {totalConnectedAccounts}
              </Typography>
            )
          : null}
      </FlexCol>
      <ConnectedWalletsTable wallets={sortedWallets} ignoreConnectDialog={ignoreConnectDialog} onIgnoreConnectDialog={onIgnoreConnectDialog} />
    </FlexCol>
  )
}

ConnectedAccountsFlexbox.displayName = 'ConnectedAccountsFlexbox'
