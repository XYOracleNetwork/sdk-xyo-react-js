import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'
import { EthAddress } from '@xylabs/sdk-js'
import React from 'react'

export interface EthersData {
  busy?: boolean
  chainId?: number | null
  connect?: () => Promise<string[] | undefined>
  connectRefused?: boolean
  error?: Error | null
  isConnected?: boolean
  localAddress?: EthAddress | null
  provider?: Provider | null
  providerName?: string
  showConnectWalletDialog?: () => void
  signer?: Signer | null
  walletProvider?: Provider | null
}

export const EthersContext = React.createContext<EthersData>({})
