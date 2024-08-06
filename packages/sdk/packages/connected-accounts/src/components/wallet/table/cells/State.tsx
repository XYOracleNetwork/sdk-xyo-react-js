import { Switch, TableCell } from '@mui/material'
import React, { ChangeEvent, useMemo } from 'react'

import { useEnabledWallets } from '../../../../hooks/index.js'
import { ConnectedWalletTableCellProps } from './lib/index.js'

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
