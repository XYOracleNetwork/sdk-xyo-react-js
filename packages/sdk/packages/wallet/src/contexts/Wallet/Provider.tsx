import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import React, { useEffect, useMemo, useState } from 'react'

import { WalletContext } from './Context.ts'

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

  const value = useMemo(() => ({ activeAccount,
    activeAccountIndex,
    provided: true,
    rootWallet,
    setActiveAccountIndex }), [activeAccount,
    activeAccountIndex,
    rootWallet,
    setActiveAccountIndex])

  return (
    <WalletContext.Provider
      value={value}
      {...props}
    >
      {children}
    </WalletContext.Provider>
  )
}
