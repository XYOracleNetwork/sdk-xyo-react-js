import type { ComponentType } from 'react'

import { ConnectedWalletsAccountsTableCell } from './Accounts.tsx'
import { ConnectedWalletsActionsTableCell } from './Actions.tsx'
import { ConnectedWalletsChainNameTableCell } from './ChainName.tsx'
import type { ConnectedWalletTableCellProps } from './lib/index.ts'
import { ConnectedWalletState } from './State.tsx'
import { ConnectedWalletsWalletTableCell } from './Wallet.tsx'

export const ConnectedWalletTableCells: ComponentType<ConnectedWalletTableCellProps>[] = [
  ConnectedWalletsWalletTableCell,
  ConnectedWalletsChainNameTableCell,
  ConnectedWalletsAccountsTableCell,
  ConnectedWalletsActionsTableCell,
  ConnectedWalletState,
]
