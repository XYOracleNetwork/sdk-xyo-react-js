import type { DiscoveredWallets, EIP6963Connector } from '@xylabs/react-crypto'
import { useWalletDiscovery } from '@xylabs/react-crypto'
import { useMemo } from 'react'

const sortWallets = (wallets: DiscoveredWallets) => {
  const result: EIP6963Connector[] = []

  for (const wallet of Object.values(wallets)) {
    if (wallet) {
      if (wallet.allowedAccounts.length > 0)
        result.unshift(wallet)
      else
        result.push(wallet)
    }
  }
  return result
}

export const useDetectedWallets = () => {
  const wallets = useWalletDiscovery()
  const sortedWallets = useMemo(() => sortWallets(wallets), [wallets])

  const totalConnectedAccounts = useMemo(
    () => Object.values(sortedWallets).reduce((acc, wallet) => acc + wallet.allowedAccounts.length, 0),
    [sortedWallets],
  )

  return { sortedWallets, totalConnectedAccounts }
}
