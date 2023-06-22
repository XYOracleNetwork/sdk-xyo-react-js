import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { AccountContext } from '../Account'
import { WalletContext } from './Context'
import { WalletRootPath } from './lib'
import { useWallet } from './use'

export interface WalletProviderProps {
  basePath?: string
  defaultActiveAccountIndex?: number
  defaultWallet?: WalletInstance
}

const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  const [account] = usePromise(() => wallet?.derivePath(activeAccountIndex.toString()))

  return <AccountContext.Provider value={{ account, provided: true }} {...props} />
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

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      // ensure the wallet has the proper base
      if (defaultWallet) {
        if (!wallet?.path.includes(basePath)) {
          try {
            const walletWithBasePath = (await defaultWallet?.derivePath(basePath)) as HDWallet
            setWallet(walletWithBasePath)
          } catch (e) {
            console.error('Error setting proper wallet base path', e)
          }
        }
      }
    },
    [basePath, defaultWallet, wallet?.path],
  )

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
