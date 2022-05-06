import { WithChildren } from '@xylabs/sdk-react'
import { XyoWalletBase } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { AccountWalletProvider } from '../Account'
import { WalletContext } from './Context'

export interface WalletProviderProps {
  defaultWallet?: XyoWalletBase
  defaultActiveAccountIndex?: number
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({ defaultWallet, defaultActiveAccountIndex = 0, children, ...props }) => {
  const [wallet, setWallet] = useState<XyoWalletBase | undefined>(defaultWallet)
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)

  return (
    <WalletContext.Provider
      value={{
        activeAccountIndex,
        provided: true,
        setActiveAccountIndex,
        setWallet,
        wallet,
      }}
      {...props}
    >
      <AccountWalletProvider>{children}</AccountWalletProvider>
    </WalletContext.Provider>
  )
}
