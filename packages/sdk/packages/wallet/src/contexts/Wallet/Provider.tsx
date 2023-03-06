import { WithChildren } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { useEffect, useState } from 'react'

import { AccountContext } from '../Account'
import { WalletContext } from './Context'
import { useWallet } from './use'

const WalletBase = 'm/'
const WalletRootPath = `${WalletBase}44'/60'/0'/0/`

export interface WalletProviderProps {
  defaultActiveAccountIndex?: number
  defaultWallet?: HDWallet
}

const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  return <AccountContext.Provider value={{ account: wallet?.deriveAccount(`${WalletRootPath}${activeAccountIndex}`), provided: true }} {...props} />
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({ children, defaultActiveAccountIndex = 0, defaultWallet, ...props }) => {
  const [wallet, setWallet] = useState<HDWallet | undefined>(defaultWallet)
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)
  const [activeRootAccountPath, setActiveRootAccountPath] = useState<string>()

  useEffect(() => {
    setActiveRootAccountPath(`${WalletRootPath}${activeAccountIndex.toString()}`)
  }, [activeAccountIndex])

  useEffect(() => {
    if (defaultActiveAccountIndex !== undefined) {
      setActiveAccountIndex(defaultActiveAccountIndex)
    }
  }, [defaultActiveAccountIndex])

  useEffect(() => {
    if (defaultWallet) {
      setWallet(defaultWallet)
    }
  }, [defaultWallet])

  const deriveRootAccount = (path: string) => {
    if (wallet) {
      return wallet.deriveAccount(`${WalletRootPath}${path}`)
    } else {
      throw new Error('Wallet was not created')
    }
  }

  return (
    <WalletContext.Provider
      value={{
        activeAccountIndex,
        activeRootAccountPath,
        deriveRootAccount,
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
