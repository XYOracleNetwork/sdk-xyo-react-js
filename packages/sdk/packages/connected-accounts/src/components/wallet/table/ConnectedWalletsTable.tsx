import { Table, TableBody, TableCell, TableHead, TableProps, TableRow } from '@mui/material'
import { DiscoveredWallets } from '@xylabs/react-crypto'

import { WalletConnectionsTableRow } from './ConnectedWalletsTableRow'

export interface ConnectedWalletsTableProps extends TableProps {
  wallets?: DiscoveredWallets
}

export const ConnectedWalletsTable: React.FC<ConnectedWalletsTableProps> = ({ wallets, ...props }) => {
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Account</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(wallets ?? {}).map((wallet) => (
          <WalletConnectionsTableRow
            approvedAccounts={wallet.allowedAccounts}
            key={wallet.providerInfo?.rdns}
            icon={wallet.providerInfo?.icon}
            name={wallet.providerName}
          />
        ))}
      </TableBody>
    </Table>
  )
}
