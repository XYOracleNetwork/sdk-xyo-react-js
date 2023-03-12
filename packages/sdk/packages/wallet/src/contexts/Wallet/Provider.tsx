import { WithChildren } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { useEffect, useState } from 'react'

import { AccountContext } from '../Account'
import { WalletContext } from './Context'
import { WalletRootPath } from './lib'
import { useWallet } from './use'

export interface WalletProviderProps {
  basePath?: string
  defaultActiveAccountIndex?: number
  defaultWallet?: HDWallet
}

const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  return <AccountContext.Provider value={{ account: wallet?.deriveAccount(activeAccountIndex.toString()), provided: true }} {...props} />
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({
  basePath = WalletRootPath,
  children,
  defaultActiveAccountIndex = 0,
  defaultWallet,
  ...props
}) => {
  const [wallet, setWallet] = useState<HDWallet | undefined>()
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
        const walletWithBasePath = defaultWallet?.derivePath(basePath)
        setWallet(walletWithBasePath)
      } catch (e) {
        console.error('Error setting proper wallet base path', e)
      }
    } else {
      throw Error('WalletProvider requires a default HDWallet')
    }
  }, [basePath, defaultWallet])

  return (
    <WalletContext.Provider
      value={{
        activeAccountIndex,
        basePath,
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
