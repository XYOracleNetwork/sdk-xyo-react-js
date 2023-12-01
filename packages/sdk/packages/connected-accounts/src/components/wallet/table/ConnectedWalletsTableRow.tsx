import { TableCell, TableRow, TableRowProps, useTheme } from '@mui/material'
import { ConstrainedImage, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { ReactNode, useMemo } from 'react'

import { ConnectedWalletsAccountsTableCell, ConnectedWalletsActionsTableCell } from './cells'

export interface WalletConnectionsTableRowInnerProps extends TableRowProps {
  additionalAccounts?: string[]
  chainName?: string
  currentAccount?: string[]
  icon?: string
  name?: string
}

export const WalletConnectionsTableRowInner: React.FC<WalletConnectionsTableRowInnerProps> = ({
  additionalAccounts,
  currentAccount,
  chainName,
  icon,
  name,
  ...props
}) => {
  const theme = useTheme()

  const totalAccounts = (additionalAccounts?.length ?? 0) + (currentAccount?.length ?? 0)
  const connected = !!(currentAccount?.length ?? 0 > 0)

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
      actions: <ConnectedWalletsActionsTableCell key={4} connected={connected} />,
    }
    return TableCells
  }, [additionalAccounts, chainName, connected, currentAccount, icon, name, theme, totalAccounts])

  return <TableRow {...props}>{Object.values(Cells).map((cell) => cell)}</TableRow>
}

export interface WalletConnectionsTableRow extends TableRowProps {
  wallet: EthWalletConnectorBase
}
export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRow> = ({ wallet, ...props }) => {
  const { currentAccount, additionalAccounts, chainName, providerInfo, providerName } = useEthWallet(wallet)
  const currentAccountString = currentAccount?.toString()
  return (
    <WalletConnectionsTableRowInner
      additionalAccounts={additionalAccounts}
      currentAccount={currentAccountString ? [currentAccountString] : []}
      chainName={chainName}
      icon={providerInfo?.icon}
      name={providerName}
      {...props}
    />
  )
}
