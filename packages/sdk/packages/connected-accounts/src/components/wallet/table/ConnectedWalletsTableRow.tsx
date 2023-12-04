import { TableCell, TableRow, TableRowProps, useTheme } from '@mui/material'
import { ConstrainedImage, EthWallet, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { ReactNode, useCallback, useMemo } from 'react'

import { ActiveProvider } from '../lib'
import { ConnectedWalletsAccountsTableCell, ConnectedWalletsActionsTableCell } from './cells'

export interface WalletConnectionsTableRowInnerProps extends TableRowProps {
  additionalAccounts?: string[]
  chainName?: string
  connectWallet?: EthWallet['connectWallet']
  currentAccount?: string[]
  icon?: string
  name?: string
  onConnectClick?: (activeProvider: ActiveProvider) => void
  onRevoke?: (activeProvider: ActiveProvider) => void
}

export const WalletConnectionsTableRowInner: React.FC<WalletConnectionsTableRowInnerProps> = ({
  additionalAccounts,
  connectWallet,
  currentAccount,
  chainName,
  icon,
  name,
  onConnectClick,
  onRevoke,
  ...props
}) => {
  const theme = useTheme()

  const totalAccounts = (additionalAccounts?.length ?? 0) + (currentAccount?.length ?? 0)
  const connected = !!(currentAccount?.length ?? 0 > 0)
  const activeProvider = useMemo(
    () => ({
      connectWallet,
      icon,
      providerName: name,
    }),
    [connectWallet, icon, name],
  )

  // Invoke the function that sets the current ActiveProvider values
  const onRevokeLocal = useCallback(() => {
    onRevoke?.(activeProvider)
  }, [activeProvider, onRevoke])

  const onConnectLocal = useCallback(() => {
    onConnectClick?.(activeProvider)
  }, [activeProvider, onConnectClick])

  const Cells = useMemo(() => {
    const TableCells: Record<string, ReactNode> = {
      wallet: (
        <TableCell key={1}>
          <FlexRow gap={2} justifyContent="start">
            <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
            {name}
          </FlexRow>
        </TableCell>
      ),
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      chain: <TableCell key={2}>{chainName}</TableCell>,
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      accounts: (
        <ConnectedWalletsAccountsTableCell
          key={3}
          additionalAccounts={additionalAccounts}
          currentAccount={currentAccount}
          totalAccounts={totalAccounts}
        />
      ),
      actions: <ConnectedWalletsActionsTableCell key={4} connected={connected} onConnect={onConnectLocal} onRevoke={onRevokeLocal} />,
    }
    return TableCells
  }, [additionalAccounts, chainName, connected, currentAccount, icon, name, onConnectLocal, onRevokeLocal, theme, totalAccounts])

  return <TableRow {...props}>{Object.values(Cells).map((cell) => cell)}</TableRow>
}

export interface WalletConnectionsTableRow extends TableRowProps {
  onConnectClick: WalletConnectionsTableRowInnerProps['onConnectClick']
  onRevoke: WalletConnectionsTableRowInnerProps['onRevoke']
  wallet: EthWalletConnectorBase
}
export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRow> = ({ wallet, ...props }) => {
  const { currentAccount, additionalAccounts, chainName, connectWallet, providerInfo, providerName } = useEthWallet(wallet)
  const currentAccountString = currentAccount?.toString()
  return (
    <WalletConnectionsTableRowInner
      additionalAccounts={additionalAccounts}
      connectWallet={connectWallet}
      currentAccount={currentAccountString ? [currentAccountString] : []}
      chainName={chainName}
      icon={providerInfo?.icon}
      name={providerName}
      {...props}
    />
  )
}
