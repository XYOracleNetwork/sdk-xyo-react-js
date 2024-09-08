import { useResetState } from '@xylabs/react-hooks'
import { usePromise } from '@xylabs/react-promise'
import type { WithChildren } from '@xylabs/react-shared'
import type { WalletInstance } from '@xyo-network/wallet-model'
import React, { useMemo } from 'react'

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
  const [activeAccountIndex, setActiveAccountIndex] = useResetState(defaultActiveAccountIndex)

  const [activeAccount = null] = usePromise(async () => await rootWallet?.derivePath(activeAccountIndex.toString()), [activeAccountIndex, rootWallet])

  const value = useMemo(() => ({
    activeAccount,
    activeAccountIndex,
    provided: true,
    rootWallet,
    setActiveAccountIndex,
  }), [activeAccount,
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
