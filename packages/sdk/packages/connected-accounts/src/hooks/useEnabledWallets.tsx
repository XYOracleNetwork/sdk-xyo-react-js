import { useWalletDiscovery } from '@xylabs/react-crypto'
import { useMemo, useSyncExternalStore } from 'react'

import { EnabledEthWalletConnections, EnabledWalletRdns } from '../classes'

let enabledEthWallets: EnabledEthWalletConnections | undefined

export const useEnabledWalletsInner = (enabledWalletsRdns?: EnabledWalletRdns) => {
  const discoveredWallets = useWalletDiscovery()

  // when we discover new wallets, build their enabled state
  const wallets = useMemo(() => {
    if (enabledEthWallets === undefined) enabledEthWallets = new EnabledEthWalletConnections()
    enabledEthWallets.resetWallets(discoveredWallets)
    Object.entries(enabledWalletsRdns ?? {}).forEach(([rdns, enabled]) => enabledEthWallets?.toggleEnabledWallet(rdns, enabled))
    return enabledEthWallets
  }, [discoveredWallets, enabledWalletsRdns])

  return useSyncExternalStore(wallets.subscribe.bind(wallets), wallets.wallets.bind(wallets))
}

export const useEnabledWallets = (enabledWalletsRdns?: EnabledWalletRdns) => {
  const wallets = useEnabledWalletsInner(enabledWalletsRdns)

  return {
    disableWallet: enabledEthWallets?.disableWallet.bind(enabledEthWallets),
    enableWallet: enabledEthWallets?.enableWallet.bind(enabledEthWallets),
    wallets,
  }
}
