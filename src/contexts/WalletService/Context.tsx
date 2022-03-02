import { createContext } from 'react'

import { XyoMetaMaskConnector } from '../../wallets'
import { WalletServiceState } from './WalletServiceTypes'

const WalletServiceContext = createContext<WalletServiceState>({ metaMaskWallet: new XyoMetaMaskConnector() })

export { WalletServiceContext }
