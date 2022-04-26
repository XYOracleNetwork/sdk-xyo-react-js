import { WithChildren } from '@xylabs/sdk-react'
import { XyoAccount, XyoWalletBase } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { WalletContext } from './Context'

export interface WalletProviderProps {
  defaultWallet?: XyoWalletBase
  defaultActiveAccountIndex?: number
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({ defaultWallet, defaultActiveAccountIndex = 0, ...props }) => {
  const [wallet, setWallet] = useState<XyoWalletBase | undefined>(defaultWallet)
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)
  const [activeAccount, setActiveAccount] = useState<XyoAccount | undefined>(defaultWallet?.getAccount(defaultActiveAccountIndex))

  useEffect(() => {
    setActiveAccount(wallet?.getAccount(activeAccountIndex))
  }, [wallet, activeAccountIndex])

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        activeAccountIndex,
        provided: true,
        setActiveAccountIndex,
        setWallet,
        wallet: wallet ?? defaultWallet,
      }}
      {...props}
    />
  )
}
