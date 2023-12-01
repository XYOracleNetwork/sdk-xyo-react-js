import { Table, TableBody, TableCell, TableHead, TableProps, TableRow } from '@mui/material'
import { EIP6963Connector } from '@xylabs/react-crypto'

import { WalletsTableHeadCells } from '../lib'
import { WalletConnectionsTableRow } from './ConnectedWalletsTableRow'

export interface ConnectedWalletsTableProps extends TableProps {
  wallets?: EIP6963Connector[]
}

export const ConnectedWalletsTable: React.FC<ConnectedWalletsTableProps> = ({ wallets, ...props }) => {
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          {WalletsTableHeadCells.map(({ disablePadding, id, label, align, width }) => (
            <TableCell align={align} key={id} padding={disablePadding ? 'none' : 'normal'} width={width ?? 'auto'}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {(wallets ?? []).map((wallet) => (
          <WalletConnectionsTableRow wallet={wallet} key={wallet.providerInfo?.rdns} />
        ))}
      </TableBody>
    </Table>
  )
}
