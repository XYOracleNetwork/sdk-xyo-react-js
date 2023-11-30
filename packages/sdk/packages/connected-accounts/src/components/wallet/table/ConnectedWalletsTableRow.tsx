import { Check } from '@mui/icons-material'
import { Button, TableCell, TableRow, TableRowProps, Typography, useTheme } from '@mui/material'
import { ConstrainedImage, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { ReactNode, useMemo } from 'react'

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
  const connected = currentAccount?.length ?? 0 > 0

  const Cells = useMemo(() => {
    const TableCells: Record<string, ReactNode> = {
      wallet: (
        <TableCell>
          <FlexRow gap={2} justifyContent="start">
            <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
            {name}
          </FlexRow>
        </TableCell>
      ),
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      chain: <TableCell>{chainName}</TableCell>,
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      accounts: <TableCell>{totalAccounts}</TableCell>,
      actions: (
        <TableCell>
          <FlexRow gap={2} justifyContent="start">
            {connected ? (
              <Typography sx={{ display: 'inline-flex', gap: 0.5 }}>
                <Check />
                Connected
              </Typography>
            ) : (
              <Button variant={'contained'}>Connect</Button>
            )}
            {connected ? (
              <Button variant={'outlined'} color={'error'}>
                Revoke
              </Button>
            ) : null}
          </FlexRow>
        </TableCell>
      ),
    }
    return TableCells
  }, [chainName, connected, icon, name, theme, totalAccounts])

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
