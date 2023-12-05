import { DiscoveredWallets, EIP6963Connector } from '@xylabs/react-crypto'

const DEFAULT_LOCAL_STORAGE_KEY = 'XYO|EnabledWalletsRdns'

/**
 * State for storing wallets and their enabled/disabled status by name
 */
export interface EnabledEthWalletsState {
  [rdns: string]: {
    enabled: boolean
    wallet: EIP6963Connector
  }
}

/**
 * State for storing only enabled/disabled status of a wallet by name
 */
export interface EnabledWalletsSavedState {
  [rdns: string]: boolean
}

export type WalletListener = () => void

export class EnabledEthWalletConnections {
  // control whether or not enabled/disabled preferences are persisted (i.e. in localStorage)
  public persistPreferences = true

  // Map of wallet names and their enabled/disabled state
  private enabledWallets: EnabledWalletsSavedState = {}

  // Map of wallet names, their enabled/disabled state, and their wallet class
  private ethWalletsState: EnabledEthWalletsState = {}

  // list of listeners that want to be notified on wallet changes
  private listeners: WalletListener[] = []

  // key to use in localStorage when persisting preferences
  private localStorageKey = DEFAULT_LOCAL_STORAGE_KEY

  constructor(localStorageKey = DEFAULT_LOCAL_STORAGE_KEY) {
    this.localStorageKey = localStorageKey
    this.reviveSettings()
  }

  get wallets() {
    return this.ethWalletsState
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
    this.ethWalletsState = newWallets
    this.emitChange()
  }

  subscribe(listener: WalletListener) {
    this.listeners = [...this.listeners, listener]
    return () => {
      this.listeners = this.listeners.filter((existingListener) => existingListener !== listener)
    }
  }

  toggleEnabledWallet(rdns: string, enabled: boolean) {
    if (rdns && this.ethWalletsState[rdns]) {
      this.ethWalletsState[rdns].enabled = enabled
      this.ethWalletsState = { ...this.ethWalletsState }
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
    if (this.persistPreferences) {
      method()
    }
  }

  private persistSettings() {
    this.isPersistance(() => {
      // convert wallet enabled selections into serializable state
      const enabledWallets = Object.entries(this.ethWalletsState).reduce((acc, [rdns, { enabled }]) => {
        acc[rdns] = enabled
        return acc
      }, {} as EnabledWalletsSavedState)

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
