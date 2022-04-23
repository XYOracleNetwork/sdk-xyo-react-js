import { WithChildren } from '@xylabs/sdk-react'
import { XyoWalletBase } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { WalletContext } from './Context'

export interface WalletProviderProps {
  defaultWallet?: XyoWalletBase
  defaultActiveAccount?: number
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({ defaultWallet, defaultActiveAccount, ...props }) => {
  const [wallet, setWallet] = useState<XyoWalletBase>()
  const [activeAccount, setActiveAccount] = useState<number>()

  return (
    <WalletContext.Provider
      value={{ activeAccount: activeAccount ?? defaultActiveAccount, provided: true, setActiveAccount, setWallet, wallet: wallet ?? defaultWallet }}
      {...props}
    />
  )
}
