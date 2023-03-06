import { WithChildren } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { useEffect, useState } from 'react'

import { AccountContext } from '../Account'
import { WalletContext } from './Context'
import { useWallet } from './use'

const WalletBase = 'm'
const WalletRootPath = "44'/60'/0'/0"

export interface WalletProviderProps {
  defaultActiveAccountIndex?: number
  defaultWallet?: HDWallet
}

const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  return <AccountContext.Provider value={{ account: wallet?.deriveAccount(activeAccountIndex.toString()), provided: true }} {...props} />
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({ children, defaultActiveAccountIndex = 0, defaultWallet, ...props }) => {
  const [wallet, setWallet] = useState<HDWallet | undefined>(defaultWallet)
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)

  useEffect(() => {
    if (defaultActiveAccountIndex !== undefined) {
      setActiveAccountIndex(defaultActiveAccountIndex)
    }
  }, [defaultActiveAccountIndex])

  useEffect(() => {
    // ensure the wallet has the proper base
    if (defaultWallet) {
      try {
        const walletWithBasePath = defaultWallet?.derivePath(WalletBase).derivePath(WalletRootPath)
        setWallet(walletWithBasePath)
      } catch (e) {
        console.error('Error setting proper wallet base path', e)
      }
    }
  }, [defaultWallet])

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
