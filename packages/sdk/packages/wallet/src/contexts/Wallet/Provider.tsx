import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { WalletContext } from './Context'
import { WalletRootPath } from './lib'
import { usePromise } from './usePromise'

export interface WalletProviderProps {
  basePath?: string
  defaultActiveAccountIndex?: number
  rootWallet?: WalletInstance | null
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({
  basePath = WalletRootPath,
  children,
  defaultActiveAccountIndex = 0,
  rootWallet = null,
  ...props
}) => {
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)

  useEffect(() => {
    if (defaultActiveAccountIndex !== undefined) {
      setActiveAccountIndex(defaultActiveAccountIndex)
    }
  }, [defaultActiveAccountIndex])

  const [coinTypeWallet = null] = usePromise(async () => {
    // ensure the wallet has the proper base
    if (rootWallet) {
      if (!rootWallet?.path.includes(basePath)) {
        try {
          return await rootWallet?.derivePath(basePath)
        } catch (e) {
          console.error('Error setting proper wallet base path', e)
        }
      }
    } else {
      return undefined
    }
  }, [basePath, rootWallet])

  const [activeAccount = null] = usePromise(
    async () => await coinTypeWallet?.derivePath(activeAccountIndex.toString()),
    [coinTypeWallet, activeAccountIndex],
  )

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        activeAccountIndex,
        basePath,
        coinTypeWallet,
        provided: true,
        rootWallet,
        setActiveAccountIndex,
      }}
      {...props}
    >
      {children}
    </WalletContext.Provider>
  )
}
