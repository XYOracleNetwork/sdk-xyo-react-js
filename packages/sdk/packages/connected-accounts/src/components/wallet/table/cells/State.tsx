import { Switch, TableCell } from '@mui/material'
import { ChangeEvent, useMemo } from 'react'

import { useEnabledWallets } from '../../../../hooks'
import { ConnectedWalletTableCellProps } from './lib'

export const ConnectedWalletState: React.FC<ConnectedWalletTableCellProps> = ({ connected, walletRdns, tableCellProps }) => {
  const { disableWallet, enableWallet, wallets } = useEnabledWallets()

  const enabled = useMemo(() => (walletRdns ? wallets[walletRdns].enabled : false), [wallets, walletRdns])

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target?.checked
    if (walletRdns) {
      checked ? enableWallet?.(walletRdns) : disableWallet?.(walletRdns)
    }
  }
  return (
    <TableCell {...tableCellProps}>
      <Switch disabled={!connected} checked={connected && enabled} onChange={handleClick} />
    </TableCell>
  )
}
