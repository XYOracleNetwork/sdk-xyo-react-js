import { TableCell } from '@mui/material'
import React from 'react'

import { ConnectedWalletTableCellProps } from './lib/index.ts'

export const ConnectedWalletsChainNameTableCell: React.FC<ConnectedWalletTableCellProps> = ({ chainName, tableCellProps }) => {
  return <TableCell {...tableCellProps}>{chainName}</TableCell>
}
