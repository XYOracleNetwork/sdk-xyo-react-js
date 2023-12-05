import { DiscoveredWallets, EIP6963Connector } from '@xylabs/react-crypto'

export interface EnabledEthWalletsState {
  [rdns: string]: {
    enabled: boolean
    wallet: EIP6963Connector
  }
}

export interface EnabledWalletsSavedState {
  [rdns: string]: boolean
}

export interface EnabledEthWalletConnectionsConfig {
  disablePersistance?: boolean
}

export type WalletListener = () => void

const DEFAULT_LOCAL_STORAGE_KEY = 'XYO|EnabledWalletsRdns'

export class EnabledEthWalletConnections {
  private enabledWallets: EnabledWalletsSavedState = {}
  private ethWallets: EnabledEthWalletsState = {}
  private listeners: WalletListener[] = []
  private localStorageKey = DEFAULT_LOCAL_STORAGE_KEY

  constructor(
    localStorageKey = DEFAULT_LOCAL_STORAGE_KEY,
    private config?: EnabledEthWalletConnectionsConfig,
  ) {
    this.localStorageKey = localStorageKey
    this.reviveSettings()
  }

  get wallets() {
    return this.ethWallets
  }

  disableWallet(rdns: string) {
    this.toggleEnabledWallet(rdns, false)
  }

  enableWallet(rdns: string) {
    this.toggleEnabledWallet(rdns, true)
  }

  /**
   * Given a new set of wallets, set their enabled state based off previous preferences
   */
  resetWallets(wallets: DiscoveredWallets) {
    const newWallets: EnabledEthWalletsState = {}

    const addWallet = ([walletName, wallet]: [string, EIP6963Connector]) => {
      newWallets[walletName] = {
        // preserve the existing enabled state
        enabled: walletName in this.enabledWallets ? this.enabledWallets[walletName] : true,
        wallet,
      }
    }

    Object.entries(wallets).forEach(addWallet.bind(this))
    this.ethWallets = newWallets
    this.emitChange()
  }

  subscribe(listener: WalletListener) {
    this.listeners = [...this.listeners, listener]
    return () => {
      this.listeners = this.listeners.filter((existingListener) => existingListener !== listener)
    }
  }

  toggleEnabledWallet(rdns: string, enabled: boolean) {
    if (rdns && this.ethWallets[rdns]) {
      this.ethWallets[rdns].enabled = enabled
      this.ethWallets = { ...this.ethWallets }
      this.emitChange()
    }
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener()
    }

    this.persistSettings()
  }

  private isPersistance(method: () => void) {
    if (!this.config?.disablePersistance) {
      method()
    }
  }

  private persistSettings() {
    this.isPersistance(() => {
      // convert wallet enabled selections into serializable state
      const enabledWallets = Object.entries(this.ethWallets).reduce((acc, [rdns, { enabled }]) => {
        acc[rdns] = enabled
        return acc
      }, {} as EnabledWalletsSavedState)

      // persist to localStorage
      localStorage.setItem(this.localStorageKey, JSON.stringify(enabledWallets))
    })
  }

  private reviveSettings() {
    this.isPersistance(() => {
      const existingEntries = localStorage.getItem(this.localStorageKey)
      try {
        const entries = existingEntries ? JSON.parse(existingEntries) : {}
        this.enabledWallets = entries
      } catch (e) {
        console.warn(`Error parsing saved enabled wallet entries: ${(e as Error).message}`)
      }
    })
  }
}
