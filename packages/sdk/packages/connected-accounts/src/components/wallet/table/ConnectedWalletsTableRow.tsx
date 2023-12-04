import { TableRow, TableRowProps } from '@mui/material'
import { EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { useCallback, useMemo } from 'react'

import { ActiveProvider } from '../lib'
import { ConnectedWalletTableCells } from './cells'

export interface WalletConnectionsTableRowProps extends TableRowProps {
  onConnectClick?: (activeProvider: ActiveProvider) => void
  onRevoke?: (activeProvider: ActiveProvider) => void
  wallet: EthWalletConnectorBase
}

export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRowProps> = ({ onConnectClick, onRevoke, wallet, ...props }) => {
  const { currentAccount: currentAccountFromWallet, additionalAccounts, chainName, connectWallet, providerInfo } = useEthWallet(wallet)

  const currentAccount = currentAccountFromWallet?.toString() ? [currentAccountFromWallet.toString()] : []
  const totalAccounts = (additionalAccounts?.length ?? 0) + (currentAccount?.length ?? 0)
  const connected = !!(currentAccount?.length ?? 0 > 0)
  const { icon, name } = useMemo(() => providerInfo ?? { icon: undefined, name: undefined }, [providerInfo])

  const activeProvider = useMemo(
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

  const onConnectLocal = useCallback(() => {
    onConnectClick?.(activeProvider)
  }, [activeProvider, onConnectClick])

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
        />
      ))}
    </TableRow>
  )
}
