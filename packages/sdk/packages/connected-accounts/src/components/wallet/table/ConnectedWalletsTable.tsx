import type { TableProps } from '@mui/material'
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material'
import type { EIP6963Connector } from '@xylabs/react-crypto'
import React, { useState } from 'react'

import { ConnectWalletDialog, RevokeWalletConnectionDialog } from '../dialogs/index.ts'
import type { ActiveProvider } from '../lib/index.ts'
import { WalletsTableHeadCells } from '../lib/index.ts'
import { WalletConnectionsTableRow } from './ConnectedWalletsTableRow.tsx'
import { useActiveProviderDialogState } from './hooks/index.ts'

export interface ConnectedWalletsTableProps extends TableProps {
  ignoreConnectDialog?: boolean
  onIgnoreConnectDialog?: (checked: boolean) => void
  wallets?: EIP6963Connector[]
}

export const ConnectedWalletsTable: React.FC<ConnectedWalletsTableProps> = ({
  ignoreConnectDialog, onIgnoreConnectDialog, wallets, ...props
}) => {
  const [activeProvider, setActiveProvider] = useState<ActiveProvider>()
  const [showConnect, onSetActiveProviderConnect, onConnectClose] = useActiveProviderDialogState(setActiveProvider)
  const [showRevoke, onSetActiveProviderRevoke, onRevokeClose] = useActiveProviderDialogState(setActiveProvider)

  return (
    <>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {WalletsTableHeadCells.map(({
              disablePadding, id, label, align, width,
            }) => (
              <TableCell align={align} key={id} padding={disablePadding ? 'none' : 'normal'} width={width ?? 'auto'}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(wallets ?? []).map(wallet => (
            <WalletConnectionsTableRow
              ignoreConnectDialog={ignoreConnectDialog}
              key={wallet.providerInfo?.rdns}
              onConnectClick={onSetActiveProviderConnect}
              onRevoke={onSetActiveProviderRevoke}
              wallet={wallet}
            />
          ))}
        </TableBody>
      </Table>
      <RevokeWalletConnectionDialog open={showRevoke} onClose={onRevokeClose} activeProvider={activeProvider} />
      <ConnectWalletDialog
        activeProvider={activeProvider}
        onClose={onConnectClose}
        open={showConnect}
        onIgnoreConnectDialog={onIgnoreConnectDialog}
      />
    </>
  )
}
