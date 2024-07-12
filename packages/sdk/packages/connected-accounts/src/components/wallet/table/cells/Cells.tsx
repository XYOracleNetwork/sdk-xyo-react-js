import { ComponentType } from 'react'

import { ConnectedWalletsAccountsTableCell } from './Accounts.js'
import { ConnectedWalletsActionsTableCell } from './Actions.js'
import { ConnectedWalletsChainNameTableCell } from './ChainName.js'
import { ConnectedWalletTableCellProps } from './lib/index.js'
import { ConnectedWalletState } from './State.js'
import { ConnectedWalletsWalletTableCell } from './Wallet.js'

export const ConnectedWalletTableCells: ComponentType<ConnectedWalletTableCellProps>[] = [
  ConnectedWalletsWalletTableCell,
  ConnectedWalletsChainNameTableCell,
  ConnectedWalletsAccountsTableCell,
  ConnectedWalletsActionsTableCell,
  ConnectedWalletState,
]
