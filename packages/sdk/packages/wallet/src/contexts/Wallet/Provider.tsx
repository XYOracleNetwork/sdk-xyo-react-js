import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { WalletContext } from './Context.js'

export interface WalletProviderProps {
  defaultActiveAccountIndex?: number
  rootWallet?: WalletInstance | null
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({
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

  const [activeAccount = null] = usePromise(async () => await rootWallet?.derivePath(activeAccountIndex.toString()), [activeAccountIndex, rootWallet])

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        activeAccountIndex,
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
