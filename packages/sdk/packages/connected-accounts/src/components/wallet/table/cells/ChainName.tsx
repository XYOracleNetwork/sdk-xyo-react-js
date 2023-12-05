import { TableCell } from '@mui/material'

import { ConnectedWalletTableCellProps } from './lib'

export const ConnectedWalletsChainNameTableCell: React.FC<ConnectedWalletTableCellProps> = ({ chainName, tableCellProps }) => {
  return <TableCell {...tableCellProps}>{chainName}</TableCell>
}
