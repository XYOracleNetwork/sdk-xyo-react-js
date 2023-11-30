import { Check } from '@mui/icons-material'
import { Button, TableCell, TableRow, TableRowProps, Typography, useTheme } from '@mui/material'
import { ConstrainedImage, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'

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

  return (
    <TableRow {...props}>
      <TableCell>
        <FlexRow gap={2} justifyContent="start">
          <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
          {name}
        </FlexRow>
      </TableCell>
      <TableCell>{chainName}</TableCell>
      <TableCell>{totalAccounts}</TableCell>
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
    </TableRow>
  )
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
