import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import { TableCell, TableRow, TableRowProps, useTheme } from '@mui/material'
import { ConstrainedImage, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'

export interface WalletConnectionsTableRowInnerProps extends TableRowProps {
  approvedAccounts?: string[]
  chainId?: number
  icon?: string
  name?: string
}

export const WalletConnectionsTableRowInner: React.FC<WalletConnectionsTableRowInnerProps> = ({
  approvedAccounts,
  chainId,
  icon,
  name,
  ...props
}) => {
  const theme = useTheme()

  const accountToDisplay = approvedAccounts?.length ? approvedAccounts[0] : null
  return (
    <TableRow {...props}>
      <TableCell>{accountToDisplay ? <RadioButtonChecked color={'success'} /> : <RadioButtonUnchecked />}</TableCell>
      <TableCell>
        <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{chainId}</TableCell>
      <TableCell>{accountToDisplay ?? 'none'}</TableCell>
    </TableRow>
  )
}

export interface WalletConnectionsTableRow extends TableRowProps {
  wallet: EthWalletConnectorBase
}
export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRow> = ({ wallet, ...props }) => {
  const { currentAccount, chainId, providerInfo, providerName } = useEthWallet(wallet)
  return (
    <WalletConnectionsTableRowInner
      approvedAccounts={[currentAccount?.toString() ?? '']}
      chainId={chainId}
      icon={providerInfo?.icon}
      name={providerName}
      {...props}
    />
  )
}
