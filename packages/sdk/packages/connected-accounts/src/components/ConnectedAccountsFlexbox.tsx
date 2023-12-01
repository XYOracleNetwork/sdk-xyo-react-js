import { Typography, useTheme } from '@mui/material'
import { EIP6963Connector, useWalletDiscovery } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useEffect, useMemo, useState } from 'react'

import { ConnectedWalletsTable } from './wallet'

const useDetectedWallets = () => {
  const wallets = useWalletDiscovery()
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const listener: () => void = () => setRefresh((refresh) => refresh + 1)
    Object.values(wallets).forEach((wallet) => {
      wallet.onAccountsChanged(listener)
    })

    return () => {
      Object.values(wallets).forEach((wallet) => {
        wallet.removeEIP11193Listener('accountsChanged', listener)
      })
    }
  }, [wallets])

  const sortedWallets = useMemo(
    () =>
      Object.values(wallets).reduce((acc, wallet) => {
        wallet.allowedAccounts.length > 0 ? acc.unshift(wallet) : acc.push(wallet)
        return acc
      }, [] as EIP6963Connector[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallets, refresh],
  )

  const totalConnectedAccounts = useMemo(
    () => Object.values(sortedWallets).reduce((acc, wallet) => acc + wallet.allowedAccounts.length, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortedWallets, refresh],
  )

  return { sortedWallets, totalConnectedAccounts }
}

export const ConnectedAccountsFlexbox: React.FC<FlexBoxProps> = (props) => {
  const theme = useTheme()

  const { totalConnectedAccounts, sortedWallets } = useDetectedWallets()

  return (
    <FlexCol alignItems="stretch" justifyContent="start" gap={2} {...props}>
      <FlexCol alignItems="start">
        <Typography variant={'h2'} sx={{ mb: 0.5 }}>
          Detected Web3 Wallets
        </Typography>
        {totalConnectedAccounts ? (
          <Typography variant={'subtitle1'} color={theme.palette.secondary.main} sx={{ opacity: 0.5 }}>
            Total Connected Accounts: {totalConnectedAccounts}
          </Typography>
        ) : null}
      </FlexCol>
      <ConnectedWalletsTable wallets={sortedWallets} />
    </FlexCol>
  )
}
