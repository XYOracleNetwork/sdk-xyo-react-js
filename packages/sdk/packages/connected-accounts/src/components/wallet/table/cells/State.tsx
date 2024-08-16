import { Switch, TableCell } from '@mui/material'
import type { ChangeEvent } from 'react'
import React, { useMemo } from 'react'

import { useEnabledWallets } from '../../../../hooks/index.ts'
import type { ConnectedWalletTableCellProps } from './lib/index.ts'

export const ConnectedWalletState: React.FC<ConnectedWalletTableCellProps> = ({ connected, walletRdns, tableCellProps }) => {
  const { disableWallet, enableWallet, wallets } = useEnabledWallets()

  const enabled = useMemo(() => (walletRdns ? wallets[walletRdns].enabled : false), [wallets, walletRdns])

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target?.checked
    if (walletRdns) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      checked ? enableWallet?.(walletRdns) : disableWallet?.(walletRdns)
    }
  }
  return (
    <TableCell {...tableCellProps}>
      <Switch disabled={!connected} checked={connected && enabled} onChange={handleClick} />
    </TableCell>
  )
}
