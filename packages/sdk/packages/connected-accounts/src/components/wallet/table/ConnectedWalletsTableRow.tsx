import type { TableRowProps } from '@mui/material'
import { TableRow } from '@mui/material'
import type { EthWalletConnectorBase } from '@xylabs/react-crypto'
import { useEthWallet } from '@xylabs/react-crypto'
import React, { useCallback, useMemo } from 'react'

import type { ActiveProvider } from '../lib/index.ts'
import { ConnectedWalletTableCells } from './cells/index.ts'

export interface WalletConnectionsTableRowProps extends TableRowProps {
  ignoreConnectDialog?: boolean
  onConnectClick?: (activeProvider: ActiveProvider) => void
  onRevoke?: (activeProvider: ActiveProvider) => void
  wallet: EthWalletConnectorBase
}

export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRowProps> = ({
  ignoreConnectDialog,
  onConnectClick,
  onRevoke,
  wallet,
  ...props
}) => {
  const {
    currentAccount: currentAccountFromWallet, additionalAccounts, chainName, connectWallet, providerInfo,
  } = useEthWallet(wallet)

  const currentAccount = currentAccountFromWallet?.toString() ? [currentAccountFromWallet.toString()] : []
  const totalAccounts = (additionalAccounts?.length ?? 0) + (currentAccount?.length ?? 0)
  const connected = !!(currentAccount?.length)
  const {
    icon, name, rdns,
  } = useMemo(() => providerInfo ?? {
    icon: undefined, name: undefined, rdns: undefined,
  }, [providerInfo])

  const activeProvider = useMemo<ActiveProvider>(
    () => ({
      connectWallet,
      icon,
      providerName: name,
    }),
    [connectWallet, icon, name],
  )

  const onRevokeLocal = useCallback(() => {
    onRevoke?.(activeProvider)
  }, [activeProvider, onRevoke])

  const onConnectLocal = useCallback(async () => {
    if (ignoreConnectDialog) {
      await connectWallet?.()
    } else {
      onConnectClick?.(activeProvider)
    }
  }, [activeProvider, connectWallet, ignoreConnectDialog, onConnectClick])

  return (
    <TableRow {...props}>
      {Object.values(ConnectedWalletTableCells).map((Cell, index) => (
        <Cell
          key={index}
          additionalAccounts={additionalAccounts}
          chainName={chainName}
          connected={connected}
          currentAccount={currentAccount}
          icon={icon}
          onConnect={onConnectLocal}
          onRevoke={onRevokeLocal}
          totalAccounts={totalAccounts}
          walletName={name}
          walletRdns={rdns}
        />
      ))}
    </TableRow>
  )
}
