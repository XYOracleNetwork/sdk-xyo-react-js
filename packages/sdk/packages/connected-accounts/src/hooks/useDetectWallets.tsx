import type { DiscoveredWallets, EIP6963Connector } from '@xylabs/react-crypto'
import { AccountsChangedEventName, useWalletDiscovery } from '@xylabs/react-crypto'
import {
  useEffect, useMemo, useState,
} from 'react'

const sortWallets = (wallets: DiscoveredWallets) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  Object.values(wallets).reduce((acc, wallet) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wallet.allowedAccounts.length > 0 ? acc.unshift(wallet) : acc.push(wallet)
    return acc
  }, [] as EIP6963Connector[])

export const useDetectedWallets = () => {
  const wallets = useWalletDiscovery()
  const [refresh, setRefresh] = useState(0)
  const [sortedWallets, setSortedWallets] = useState<EIP6963Connector[]>([])

  useEffect(() => {
    setSortedWallets(sortWallets(wallets))
  }, [wallets, refresh])

  /**
   * Rely on custom events from the wallet base class to know when accounts are changed.
   * This approach prevents the need to loop through all wallets and set up individual listeners.
   */
  useEffect(() => {
    const listener: (event: CustomEventInit) => void = () => {
      setRefresh(refresh => refresh + 1)
    }
    // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
    window.addEventListener(AccountsChangedEventName, listener)

    return () => {
      window.removeEventListener(AccountsChangedEventName, listener)
    }
  }, [wallets])

  const totalConnectedAccounts = useMemo(
    () => Object.values(sortedWallets).reduce((acc, wallet) => acc + wallet.allowedAccounts.length, 0),
    [sortedWallets],
  )

  return { sortedWallets, totalConnectedAccounts }
}
