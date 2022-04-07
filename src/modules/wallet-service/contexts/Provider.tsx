import { ReactNode } from 'react'

import { WalletServiceContext } from './Context'
import { defaultState } from './defaultState'

export const WalletServiceProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <WalletServiceContext.Provider value={defaultState()}>{children}</WalletServiceContext.Provider>
}
