import { Typography } from '@mui/material'
import { EIP6963Connector, useWalletDiscovery } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useMemo } from 'react'

import { ConnectedWalletsTable } from './wallet'
export const ConnectedAccountsFlexbox: React.FC<FlexBoxProps> = (props) => {
  const wallets = useWalletDiscovery()
  const sortedWallets = useMemo(
    () =>
      Object.values(wallets).reduce((acc, wallet) => {
        wallet.allowedAccounts.length > 0 ? acc.unshift(wallet) : acc.push(wallet)
        return acc
      }, [] as EIP6963Connector[]),
    [wallets],
  )

  // TODO - make reactive
  const totalConnectedAccounts = useMemo(
    () => Object.values(wallets ?? {}).reduce((acc, wallet) => acc + wallet.allowedAccounts.length, 0),
    [wallets],
  )

  return (
    <FlexCol alignItems="stretch" justifyContent="start" gap={2} {...props}>
      <FlexCol alignItems="start">
        <Typography variant={'h2'} sx={{ mb: 0.5 }}>
          Detected Web3 Wallets
        </Typography>
        {totalConnectedAccounts ? (
          <Typography variant={'subtitle1'} sx={{ opacity: 0.5 }}>
            Total Connected Accounts: {totalConnectedAccounts}
          </Typography>
        ) : null}
      </FlexCol>
      <ConnectedWalletsTable wallets={sortedWallets} />
    </FlexCol>
  )
}
