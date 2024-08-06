import { TableCell, Tooltip, Typography } from '@mui/material'
import React from 'react'

import { ConnectedWalletTableCellProps } from './lib/index.ts'

export const ConnectedWalletsAccountsTableCell: React.FC<ConnectedWalletTableCellProps> = ({
  additionalAccounts,
  currentAccount,
  totalAccounts,
  tableCellProps,
}) => {
  return (
    <TableCell {...tableCellProps}>
      <Tooltip
        sx={{ cursor: totalAccounts > 0 ? 'pointer' : 'auto' }}
        title={[...(currentAccount ?? []), ...(additionalAccounts ?? [])].map((address, index) => (
          <p key={index}>{address}</p>
        ))}
      >
        <Typography>{totalAccounts}</Typography>
      </Tooltip>
    </TableCell>
  )
}
