import { useWalletDiscovery } from '@xylabs/react-crypto'
import { useMemo, useSyncExternalStore } from 'react'

import { EnabledEthWalletConnections, EnabledEthWalletsState, EnabledWalletsSavedState } from '../classes/index.js'

let enabledEthWallets: EnabledEthWalletConnections | undefined

/**
 * Takes the discovered wallets and tracks their enabled state globally
 */
export const useEnabledWalletsInner = (enabledWalletsRdns?: EnabledWalletsSavedState) => {
  const discoveredWallets = useWalletDiscovery()

  // when we discover new wallets, build their enabled state
  const wallets = useMemo(() => {
    if (enabledEthWallets === undefined) enabledEthWallets = new EnabledEthWalletConnections()
    enabledEthWallets.resetWallets(discoveredWallets)
    for (const [rdns, enabled] of Object.entries(enabledWalletsRdns ?? {})) enabledEthWallets?.toggleEnabledWallet(rdns, enabled)
    return enabledEthWallets
  }, [discoveredWallets, enabledWalletsRdns])

  return useSyncExternalStore(wallets.subscribe.bind(wallets), () => wallets.wallets)
}

/**
 * Expose an interface for enabling and disabling wallets
 */
export const useEnabledWallets = (enabledWalletsRdns?: EnabledWalletsSavedState) => {
  const wallets = useEnabledWalletsInner(enabledWalletsRdns)
  const enabledWallets = useMemo(
    () =>
      // eslint-disable-next-line unicorn/no-array-reduce
      Object.entries(wallets).reduce((acc, [walletName, wallet]) => {
        if (wallet.enabled) acc[walletName] = wallet
        return acc
      }, {} as EnabledEthWalletsState),
    [wallets],
  )

  return {
    disableWallet: enabledEthWallets?.disableWallet.bind(enabledEthWallets),
    enableWallet: enabledEthWallets?.enableWallet.bind(enabledEthWallets),
    enabledWallets,
    wallets,
  }
}
