import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import { Badge, Chip, TableCell, TableRow, TableRowProps, useTheme } from '@mui/material'
import { ConstrainedImage, EthWalletConnectorBase, useEthWallet } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'

export interface WalletConnectionsTableRowInnerProps extends TableRowProps {
  additionalAccounts?: string[]
  approvedAccounts?: string[]
  chainId?: number
  icon?: string
  name?: string
}

export const WalletConnectionsTableRowInner: React.FC<WalletConnectionsTableRowInnerProps> = ({
  additionalAccounts,
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
      <TableCell align="center">{accountToDisplay ? <RadioButtonChecked color={'success'} /> : <RadioButtonUnchecked />}</TableCell>
      <TableCell>
        <FlexRow gap={2} justifyContent="start">
          <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
          {name}
        </FlexRow>
      </TableCell>
      <TableCell>{chainId ? <Chip label={chainId} /> : null}</TableCell>
      <TableCell>
        {additionalAccounts?.length ? (
          <Badge badgeContent={`+${additionalAccounts.length}`} color="primary">
            <Chip label={accountToDisplay} />
          </Badge>
        ) : (
          <Chip label={accountToDisplay ?? 'none'} />
        )}
      </TableCell>
    </TableRow>
  )
}

export interface WalletConnectionsTableRow extends TableRowProps {
  wallet: EthWalletConnectorBase
}
export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRow> = ({ wallet, ...props }) => {
  const { currentAccount, additionalAccounts, chainId, providerInfo, providerName } = useEthWallet(wallet)
  const currentAccountString = currentAccount?.toString()
  return (
    <WalletConnectionsTableRowInner
      additionalAccounts={additionalAccounts}
      approvedAccounts={currentAccountString ? [currentAccountString] : []}
      chainId={chainId}
      icon={providerInfo?.icon}
      name={providerName}
      {...props}
    />
  )
}
