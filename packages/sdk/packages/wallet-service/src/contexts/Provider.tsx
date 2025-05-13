import { MetaMaskConnector } from '@xyo-network/metamask-connector'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { WalletServiceContext } from './Context.ts'
import type { WalletServiceState } from './State.ts'

export const WalletServiceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value: WalletServiceState = useMemo(() => {
    return { metaMaskWallet: new MetaMaskConnector(), provided: true }
  }, [])
  return <WalletServiceContext value={value}>{children}</WalletServiceContext>
}
