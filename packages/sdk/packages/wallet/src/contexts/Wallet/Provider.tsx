import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { WalletContext } from './Context'
import { WalletRootPath } from './lib'

export interface WalletProviderProps {
  basePath?: string
  defaultActiveAccountIndex?: number
  rootWallet?: WalletInstance
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({
  basePath = WalletRootPath,
  children,
  defaultActiveAccountIndex = 0,
  rootWallet,
  ...props
}) => {
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)

  useEffect(() => {
    if (defaultActiveAccountIndex !== undefined) {
      setActiveAccountIndex(defaultActiveAccountIndex)
    }
  }, [defaultActiveAccountIndex])

  const [derivedWallet] = usePromise(async () => {
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

  const [activeAccount] = usePromise(() => derivedWallet?.derivePath(activeAccountIndex.toString()), [derivedWallet, activeAccountIndex])

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        activeAccountIndex,
        basePath,
        derivedWallet,
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
