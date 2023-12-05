import { ComponentType } from 'react'

import { ConnectedWalletsAccountsTableCell } from './Accounts'
import { ConnectedWalletsActionsTableCell } from './Actions'
import { ConnectedWalletsChainNameTableCell } from './ChainName'
import { ConnectedWalletTableCellProps } from './lib'
import { ConnectedWalletState } from './State'
import { ConnectedWalletsWalletTableCell } from './Wallet'

export const ConnectedWalletTableCells: ComponentType<ConnectedWalletTableCellProps>[] = [
  ConnectedWalletsWalletTableCell,
  ConnectedWalletsChainNameTableCell,
  ConnectedWalletsAccountsTableCell,
  ConnectedWalletsActionsTableCell,
  ConnectedWalletState,
]
