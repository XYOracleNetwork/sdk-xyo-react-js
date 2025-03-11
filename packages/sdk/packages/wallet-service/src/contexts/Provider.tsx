import type { PropsWithChildren } from 'react'
import React from 'react'

import { WalletServiceContext } from './Context.ts'
import { defaultState } from './defaultState.ts'

export const WalletServiceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <WalletServiceContext value={defaultState()}>{children}</WalletServiceContext>
}
